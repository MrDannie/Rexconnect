import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DashboardCount } from '../../shared/interfaces/dashboard';
import * as CryptoJS from 'crypto-js';
import { map, filter, switchMap } from 'rxjs/operators';
import { Config } from 'src/app/core/Config';
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class UserLayoutService {
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

  getDashboardCount(): Observable<DashboardCount> {
    // const header = this.createAuthorizationHeader();
    return this.httpClient
      .get(`${BASE_URL}${this.config.getStatisticsLink}`)
      .pipe(
        map((data: DashboardCount) => {
          return data;
        })
      );
  }

  getTopTerminalStat() {
    return this.httpClient
      .get(`${BASE_URL}/v1/reports/getTopTerminalReport`)
      .pipe(
        map((response: DashboardCount) => {
          // console.log('Top Terminal Stat', response);
          return response;
        })
      );
  }

  getTopMerchantsStat() {
    return this.httpClient
      .get(`${BASE_URL}/v1/reports/getTopMerchantReport`)
      .pipe(
        map((response: DashboardCount) => {
          // console.log('Top Terminal Stat', response);
          return response;
        })
      );
  }
}
