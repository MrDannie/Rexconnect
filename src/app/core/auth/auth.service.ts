import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import * as CryptoJS from 'crypto-js';

import { environment } from 'src/environments/environment';
import { Config } from '../Config';

const BASE_URL = environment.BASE_URL;
// const EXTERNAL_BASE_URL = environment.EXTERNAL_BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  bearerToken: string;
  constructor(private httpClient: HttpClient, private config: Config) {}

  createAuthorizationHeader(): HttpHeaders {
    const bearer_token = localStorage.getItem('Genin');
    if (!isNullOrUndefined(bearer_token) || bearer_token !== null) {
      const Data = CryptoJS.AES.decrypt(bearer_token.toString(), 'Konohamaru');
      this.bearerToken = JSON.parse(Data.toString(CryptoJS.enc.Utf8));
      // console.log(this.bearerToken);
      this.bearerToken = this.bearerToken['accessToken'];
      let header = new HttpHeaders();
      header = header.append('Authorization', 'Bearer ' + this.bearerToken);
      return header;
    } else {
      return;
    }
  }
  login(loginDetails: object) {
    const header = this.createAuthorizationHeader();
    return this.httpClient
      .post(`${BASE_URL}/v1/auth/login`, loginDetails, { headers: header })
      .pipe(map((user) => user));
  }
}
