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


const BASE_URL = environment.BASE_URL;
// const EXTERNAL_BASE_URL = environment.EXTERNAL_BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  bearerToken: string;
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private router: Router
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
}
