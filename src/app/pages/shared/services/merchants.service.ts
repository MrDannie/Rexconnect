// tslint:disable
import { Config } from './../../../core/Config';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})

export class MerchantsService {

  bearerToken: string;
  config: Config;

  constructor(
    private http: HttpClient
  ) {
    this.config = new Config();
  }

  createAuthorizationHeader(): HttpHeaders {
    const bearer_token = localStorage.getItem("Genin");
    if (!isNullOrUndefined(bearer_token) || bearer_token !== null) {
      const Data = CryptoJS.AES.decrypt(bearer_token.toString(), "Konohamaru");
      this.bearerToken = JSON.parse(Data.toString(CryptoJS.enc.Utf8));
      this.bearerToken = this.bearerToken["accessToken"];
      let header = new HttpHeaders();
      header = header.append("Authorization", "Bearer " + this.bearerToken);
      return header;
    } else {
      return;
    }
  }

  getMerchantList(): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.http
      .get(BASE_URL + "/v1/merchants/getMerchantList", {
        headers: header
    });
  }

}
