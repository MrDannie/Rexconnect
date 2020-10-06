import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { DashboardCount } from '../interfaces/DashboardCount';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { Config } from 'src/app/core/Config';
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpClient: HttpClient, private config: Config) {}

  getDashboardCount(): Observable<DashboardCount> {
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
