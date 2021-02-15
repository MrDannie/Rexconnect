import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IUser } from '../../pages/shared/interfaces/user';
import { StorageService } from '../helpers/storage.service';
import { Router } from '@angular/router';
import { Config } from '../Config';

const BASE_URL = environment.BASE_URL;
const EXTERNAL_BASE_URL = environment.EXTERNAL_BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  bearerToken: string;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private router: Router,
    private config: Config
  ) {}

  login(loginDetails: object) {
    return this.httpClient
      .post(`${BASE_URL}/v1/auth/login`, loginDetails)
      .pipe(map((user) => user));
  }

  logout() {
    this.storageService.removeAll();
    this.router.navigate(['sign-in']);
  }

  getClientDetails(): Observable<IUser> {
    return this.httpClient.get(`${BASE_URL}/v1/settings`).pipe(
      map((response: IUser) => {
        console.log(response);
        localStorage.setItem('Currency', response['currencyCode']);
        return response;
      })
    );
  }

  useXToken() {
    this.getXToken().subscribe(
      (res) => {
        localStorage.setItem('AC', JSON.stringify(res));
      },
      (err) => {
        console.log(err);
      }
    );
  }
  getXToken() {
    return this.httpClient.post(
      `${EXTERNAL_BASE_URL}${this.config.getXToken}`,
      {
        durtion: 12000,
      }
    );
  }

  sendLink(email: object) {
    return this.httpClient
      .post(BASE_URL + '/v1/auth/reset-password', email)
      .pipe(
        map((user) => {
          return user;
        })
      );
  }
}
