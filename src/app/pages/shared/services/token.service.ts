import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/internal/observable/of';
import { map } from 'rxjs/operators';

import { AlertService } from 'src/app/core/alert/alert.service';
import { Config } from 'src/app/core/Config';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { environment } from 'src/environments/environment';
import { resolve } from 'url';
import { IAccessControlData } from '../interfaces/AccessControlData';

const BASE_URL = environment.EXTERNAL_BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class TokenService {
public token: any;
  constructor( private httpClient: HttpClient,
               private config: Config, private alertService: AlertService) {

               }

  public  getAccessControlData(httpMethod: string, encodedUrl: string) {

    return this.getXtoken(httpMethod, encodedUrl).then((data) => data);

  }

 public  getXtoken(httpMethod: string, encodedUrl: string) {

 return new Promise((resolve, reject) => {
    this.httpClient
      .post(`${BASE_URL}${this.config.getXToken}` , { durtion: 1200 })
      .toPromise()
      .then((res: IAccessControlData) => {
        // Success
        console.log(res, '1st');
        resolve(this.computeSignature(httpMethod, encodedUrl));

      },
        (err) => {
          // Error
          reject(err);
        },
      );
  });
}

  public computeSignature(httpMethod, encodedUrl) {
    const timestamp: string = environment.TIMESTAMP;
    const nonce: string = environment.NONCE;
    const { accessToken, accessSecret, validTill } = JSON.parse(
      localStorage.getItem("AC")
    );
    return cryptoJS
    .SHA512(
      `${accessToken}&&${accessSecret}&&${timestamp}&&${nonce}&&${httpMethod}&&${encodeURIComponent(
        encodedUrl
      )}`
    )
    .toString();
  }

}

