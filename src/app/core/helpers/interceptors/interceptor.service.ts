// tslint:disable

import {
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  authToken: string;
  constructor(private storageService: StorageService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    console.log('HERE IS THE HTTP REQUEST', req.url);

    if (true) {
      const storedToken = this.storageService.getCurrentUser();
      const { accessToken } = storedToken ? storedToken : { accessToken: null };

      if (req.url.includes('uploadTerminals')) {
        const request = req.clone();
        return next.handle(request);
      }


      if (req.headers.get('Content-Type') != undefined && req.headers.get('Content-Type') != null) {
        headers = new HttpHeaders({
          'Content-type': req.headers.get('Content-Type'),
          Authorization: 'Bearer ' + accessToken,
        });
      } else {
        headers = new HttpHeaders({
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        });
      }


      let httpRequest: HttpRequest<any> = req.clone({
        headers,
      });
      return next.handle(httpRequest);
    }
  }
}
