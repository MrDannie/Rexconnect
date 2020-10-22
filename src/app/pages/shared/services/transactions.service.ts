import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


import { isNullOrUndefined } from 'util';
import { environment } from '../../../../environments/environment';
import { ITransactions } from '../interfaces/Transactions';
import { IWrapper } from '../interfaces/wrapper.model';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class TransactionsService {
  constructor(private httpClient: HttpClient) {}

  getTransactions(pageIndex, pageSize): Observable<IWrapper<ITransactions>> {
    const params = new HttpParams();
    const requestParams = params
      .append('page', pageIndex.toString())
      .append('size', pageSize.toString());
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
}
