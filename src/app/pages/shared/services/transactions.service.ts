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

  getTransactions(
    pageIndex,
    pageSize,
    startDate,
    endDate,
    merchantId?,
    terminalId?,
    type?,
    referenceNumber?
  ): Observable<IWrapper<ITransactions>> {
    let params = new HttpParams();

    if (pageIndex) {
      params = params.append('page', pageIndex.toString());
    }
    if (pageSize) {
      params = params.append('size', pageSize.toString());
    }
    if (terminalId) {
      params = params.append('terminalId', terminalId);
    }
    if (referenceNumber) {
      params = params.append('referenceNumber', referenceNumber);
    }
    if (type) {
      params = params.append('type', type);
    }
    if (startDate) {
      params = params.append('startDate', startDate);
    }
    if (merchantId) {
      params = params.append('merchantId', merchantId);
    }
    if (endDate) {
      params = params.append('endDate', endDate);
    }
    return this.httpClient
      .get<IWrapper<ITransactions>>(BASE_URL + '/v1/transactions', {
        params: params,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }

  getSingleTransaction(transactionId): any {
    let params = new HttpParams();

    if (transactionId) {
      params = params.append('transactionId', transactionId.toString());
    }

    return this.httpClient
      .get<any>(BASE_URL + '/v1/transactions', {
        params: params,
      })
      .pipe(
        map((response) => {
          console.log('Resonse on filterered transactions', response);
          return response;
        })
      );
  }

  getFilteredTransactions(pageIndex, pageSize, options?: SearchTransactions) {
    let params = new HttpParams();

    if (pageIndex) {
      params = params.append('page', pageIndex.toString());
    }
    if (pageSize) {
      params = params.append('size', pageSize.toString());
    }
    if (options.terminalId) {
      params = params.append('terminalId', options.terminalId);
    }
    if (options.referenceNumber) {
      params = params.append('referenceNumber', options.referenceNumber);
    }
    if (options.type) {
      params = params.append('type', options.type);
    }
    if (options.startDate) {
      params = params.append('startDate', options.startDate);
    }
    if (options.merchantId) {
      params = params.append('merchantId', options.merchantId);
    }
    if (options.endDate) {
      params = params.append('endDate', options.endDate);
    }

    return this.httpClient
      .get<IWrapper<ITransactions>>(BASE_URL + '/v1/transactions', {
        params: params,
      })
      .pipe(
        map((response) => {
          console.log('Resonse on filterered transactions', response);
          return response;
        })
      );
  }
}
