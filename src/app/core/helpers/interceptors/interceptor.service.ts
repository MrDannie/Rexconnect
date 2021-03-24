// tslint:disable

import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Observable, throwError } from 'rxjs';
import { IAccessControlData } from 'src/app/pages/shared/interfaces/AccessControlData';
import { TokenService } from 'src/app/pages/shared/services/token.service';
import { ManageRoutesRoutingModule } from 'src/app/pages/user/user-layout/manage-routes/manage-routes-routing.module';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';
import { Config } from '../../Config';
import { StorageService } from '../storage.service';
import { from } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';

const ACCESS_CONTROL_BTOA = environment.ACCESS_CONTROL_BTOA;
const EXTERNAL_BASE_URL = environment.EXTERNAL_BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  accessControlData: IAccessControlData;

  constructor(
    private storageService: StorageService,
    private config: Config,
    private tokenService: TokenService,
    private authService: AuthService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();
    console.log('HERE IS THE HTTP REQUEST', req.url);

    if (true) {
      const storedToken = this.storageService.getCurrentUser();
      const { accessToken } = storedToken ? storedToken : { accessToken: null };

      if (req.url.includes('/v1/terminals/upload')) {
        headers = new HttpHeaders({
          Authorization: 'Bearer ' + accessToken,
        });
        const request = req.clone({ headers });
        return next.handle(request);
      }

      if (
        req.headers.get('Content-Type') != undefined &&
        req.headers.get('Content-Type') != null
      ) {
        headers = new HttpHeaders({
          'Content-type': req.headers.get('Content-Type'),
          Authorization: 'Bearer ' + accessToken,
        });
      } else if (req.url.includes(this.config.getXToken)) {
        console.log(ACCESS_CONTROL_BTOA);
        console.log('access control');

        headers = headers.append('Content-Type', 'application/json');
        headers = headers.append('Accept', 'application/json');
        headers = headers.append(
          'Authorization',
          `Basic ${ACCESS_CONTROL_BTOA}`
        );
      } else if (req.url.includes(this.config.auditLogs)) {
        const ACCESS_CONTROL_VALUES = JSON.parse(localStorage.getItem('AC'));
        console.log(ACCESS_CONTROL_VALUES);

        const { accessToken, validTill } = ACCESS_CONTROL_VALUES;
        console.log(EXTERNAL_BASE_URL);

        console.log(
          req.urlWithParams.split(EXTERNAL_BASE_URL).join().replace(/,/g, ''),
          req.urlWithParams
        );

        headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Signature: this.tokenService
            .computeSignature(
              req.method,
              req.urlWithParams
                .split(EXTERNAL_BASE_URL)
                .join()
                .replace(/,/g, '')
            )
            .toString(),
          X_TOKEN: accessToken,
          NONCE: environment.NONCE,
          TIMESTAMP: environment.TIMESTAMP,
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
      return next.handle(httpRequest).pipe(
        retry(2),
        catchError((error: HttpErrorResponse) => {
          if (error.error.error.responseMessage === 'jwt expired') {
            // 401 handled in auth.interceptor
            this.authService.logout();
          }
          return throwError(error);
        })
      );
    }
  }

  //  async getAccessControlData(req){
  //  const val = await this.tokenService.getAccessControlData('POST', 'htttpdsdds');
  //  console.log(val);
  //  return 'sdsd'
  //  }

  getAccessControlData(req): HttpHeaders {
    const headers = new HttpHeaders();

    from(
      this.tokenService.getAccessControlData('POST', 'htttpdsdds')
    ).subscribe(
      (res: IAccessControlData) => {
        console.log('ssfdsfsd', res);

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Signature: res.signature,
          X_TOKEN: res.x_token,
          timestamp: res.timestamp,
          nonce: res.nonce,
        });
        return headers;
      },
      (error) => {
        console.log(error);
      }
    );
    return headers;
  }
}
