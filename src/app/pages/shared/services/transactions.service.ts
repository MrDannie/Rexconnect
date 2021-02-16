import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { isNullOrUndefined } from 'util';
import { environment } from '../../../../environments/environment';
import { ITransactions, SearchTransactions } from '../interfaces/Transactions';
import { IWrapper } from '../interfaces/wrapper.model';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private httpClient: HttpClient) {}

  getTransactions(pageIndex, pageSize, startDate, endDate): Observable<IWrapper<ITransactions>> {
    const params = new HttpParams();
    const requestParams = params
      .append('page', pageIndex.toString())
      .append('size', pageSize.toString())
      .append('startDate', startDate)
      .append('endDate', endDate);
    return this.httpClient
      .get<IWrapper<ITransactions>>(BASE_URL + '/v1/transactions', {
        params: requestParams,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getFilteredTransactions(
    pageIndex,
    pageSize,
    options?: SearchTransactions
  ) {
    const params = new HttpParams();
    const requestParams = params
      .append('page', pageIndex.toString())
      .append('size', pageSize.toString())
      .append('terminalId', options.terminalId)
      .append('referenceNumber', options.referenceNumber)
      .append('transactionType', options.type)
      .append('startDate', options.startDate)
      .append('merchantId', options.merchantId)
      .append('endDate', options.endDate);
    return this.httpClient
      .get<IWrapper<ITransactions>>(BASE_URL + '/v1/transactions', {
        params: requestParams,
      })
      .pipe(
        map((response) => {
          console.log('Resonse on filterered transactions', response);
          return response;
        })
      );
  }
}
