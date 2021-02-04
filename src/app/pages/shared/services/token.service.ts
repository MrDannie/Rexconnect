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

 return new Promise((resolve, reject) => {
    this.httpClient
      .post(`${BASE_URL}${this.config.getXToken}` , { durtion: 1200 })
      .toPromise()
      .then((res: any) => {
        // Success
        console.log(res, '1st');
        resolve();
        this.computeSignature(httpMethod, encodedUrl, res);

      },
        (err) => {
          // Error
          reject(err);
        },
      );
  }).then((res)=> {
    this.token = res;
    console.log(this.token)
    return this.token;

  }, (error)=> {

  });
}

  public computeSignature(httpMethod, encodedUrl, token) {
    console.log(token);
    const timestamp: string = environment.TIMESTAMP;
    const nonce: string = environment.NONCE;

    const accessControlData = {
      nonce: environment.NONCE,
      signature: cryptoJS
        .SHA512(
          `${token.accessToken}&&${token.accessSecret}&&${timestamp}&&${nonce}&&${httpMethod}&&${encodeURIComponent(
            encodedUrl,
          )}`,
        )
        .toString(),
      timestamp: environment.TIMESTAMP,
      x_token: token.accessToken,

    };
    console.log(accessControlData);
    return accessControlData;
    // return Observable.of(cryptoJS
    //   .SHA512(
    //     `${token.accessToken}&&${token.accessSecret}&&${timestamp}&&${nonce}&&${httpMethod}&&${encodeURIComponent(
    //       encodedUrl,
    //     )}`,
    //   )
    //   .toString()).toPromise();
  }

  public getPosts() {
    const promise = new Promise((resolve, reject) => {
      this.httpClient
        .post(`${BASE_URL}${this.config.getXToken}` , { durtion: 1200 })
        .toPromise()
        .then((res: any) => {
          // Success
          resolve();
        },
          (err) => {
            // Error
            reject(err);
          },
        );
    });
    return promise;
  }
}

