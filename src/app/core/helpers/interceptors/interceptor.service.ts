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
import { IAccessControlData } from 'src/app/pages/shared/interfaces/AccessControlData';
import { TokenService } from 'src/app/pages/shared/services/token.service';
import { ManageRoutesRoutingModule } from 'src/app/pages/user/user-layout/manage-routes/manage-routes-routing.module';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';
import { Config } from '../../Config';
import { StorageService } from '../storage.service';


const ACCESS_CONTROL_BTOA = environment.ACCESS_CONTROL_BTOA;
const EXTERNAL_BASE_URL = environment.EXTERNAL_BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  accessControlData: IAccessControlData;

  constructor(private storageService: StorageService, private config: Config, private tokenService: TokenService) {}
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
          'Authorization': 'Bearer ' + accessToken
        })
        const request = req.clone({ headers });
        return next.handle(request);
      }


      if (req.headers.get('Content-Type') != undefined && req.headers.get('Content-Type') != null) {
        headers = new HttpHeaders({
          'Content-type': req.headers.get('Content-Type'),
          Authorization: 'Bearer ' + accessToken,
        });
      } else if (req.url.includes(this.config.getXToken)) {
          console.log(ACCESS_CONTROL_BTOA);
          console.log('access control');
          
          headers = headers.append("Content-Type", "application/json");
          headers = headers.append("Accept", "application/json");
          headers = headers.append(
            "Authorization",
            `Basic ${ACCESS_CONTROL_BTOA}`
          );
      } else if (req.url.includes(this.config.auditLogs)) {
        console.log(ACCESS_CONTROL_BTOA);
        console.log('access control');
        
        headers = headers.append("Content-Type", "application/json");
        headers = headers.append("Accept", "application/json");
        // headers = headers.append("Signature",   this.getAccessControlData(req))
        // headers = headers.append("X_TOKEN",   this.accessControlData.x_token)
        // headers = headers.append("Nonce",   this.accessControlData.nonce)
        // headers = headers.append("Timestamp",   this.accessControlData.timestamp)

        headers = headers.append(
          "Authorization",
          `Basic ${ACCESS_CONTROL_BTOA}`
        );
    }
      
      
      else {
        headers = new HttpHeaders({
          'Content-type': 'application/json',
          Authorization: 'Bearer ' + accessToken,
        });
      }


      let httpRequest: HttpRequest<any> = req.clone({
        headers
      });
      return next.handle(httpRequest);
    }
  }

  //  async getAccessControlData(req){
  //  const val = await this.tokenService.getAccessControlData('POST', 'htttpdsdds');
  //  console.log(val);
  //  return 'sdsd'
  //  }

   getAccessControlData() {
    const promise = new Promise((resolve, reject) => {
      this.tokenService.getAccessControlData('POST', 'htttpdsdds').then((res: any) => {
          // Success
         console.log(res)
          resolve();
        },
          err => {
            // Error
            reject(err);
          }
        );
    });
    return promise;
  }

   
}
