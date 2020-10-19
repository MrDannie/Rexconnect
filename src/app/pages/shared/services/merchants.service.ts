import { ITransaction } from './../interfaces/transactions.model';
import { ITerminal } from './../interfaces/terminals.model';
import { IMerchant } from './../interfaces/merchants.model';
import { IWrapper } from './../interfaces/wrapper.model';
// tslint:disable
import { Config } from './../../../core/Config';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})

export class MerchantsService {

  bearerToken: string;
  config: Config;

  constructor(
    private http: HttpClient
  ) {
    this.config = new Config();
  }

  createAuthorizationHeader(): HttpHeaders {
    const bearer_token = localStorage.getItem("Genin");
    if (!isNullOrUndefined(bearer_token) || bearer_token !== null) {
      const Data = CryptoJS.AES.decrypt(bearer_token.toString(), "Konohamaru");
      this.bearerToken = JSON.parse(Data.toString(CryptoJS.enc.Utf8));
      this.bearerToken = this.bearerToken["accessToken"];
      let header = new HttpHeaders();
      header = header.append("Authorization", "Bearer " + this.bearerToken);
      return header;
    } else {
      return;
    }
  }

  getMerchantList(): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.http
      .get(BASE_URL + this.config.getMerchantsList, {
        headers: header
    });
  }

  getAllMerchants(pageIndex: number, pageSize: number, merchantId?: string): Observable<IWrapper<IMerchant>> {
    const headers = this.createAuthorizationHeader();
    const params = new HttpParams();
    const getMerchantsParams = params.append('page', pageIndex.toString())
      .append('size', pageSize.toString())
      .append('merchantId', merchantId || '');

    return this.http.get<IWrapper<IMerchant>>(
      BASE_URL + this.config.getAllMerchants, {
        headers,
        params: getMerchantsParams
      }
    );
  }

  getMerchantTerminals(merchantId): Observable<IWrapper<ITerminal>> {
    const header = this.createAuthorizationHeader();
    return this.http.get<IWrapper<ITerminal>>(
      BASE_URL + this.config.getMerchantTerminals.replace('{merchantId}', merchantId), {
        headers: header,
      }
    );
  }

  getMerchant(merchantId: string): Observable<IMerchant> {
    const header = this.createAuthorizationHeader();
    return this.http.get<IMerchant>(
      BASE_URL + this.config.getSingleMerchant.replace('{merchantId}', merchantId), {
        headers: header
      }
    )
  }

  getAllCities(countryCode): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.http.get(
      BASE_URL + this.config.getStates.replace('{countryCode}', countryCode), {
        headers: header
      }
    )
  }

  addNewMerchant(merchantDetails): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.http.post(
      BASE_URL + this.config.addNewMerchant, JSON.stringify(merchantDetails), {
        headers: header
      });
  }

  updateMerchant(merchantId, merchantDetails): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.http.put(BASE_URL + this.config.getSingleMerchant.replace('{merchantId}', merchantId), merchantDetails, {
        headers: header,
      })
  }

  getMerchantTransactions(merchantId: string, pageIndex: number, pageSize: number): Observable<IWrapper<ITransaction>> {
    const header = this.createAuthorizationHeader();

    const params = new HttpParams();
    const merchantTransactionsParams = params.append('merchantId', merchantId)
      .append('page', pageIndex.toString())
      .append('size', pageSize.toString());

    return this.http.get<IWrapper<ITransaction>>(
      BASE_URL + this.config.getTransactions, {
        headers: header,
        params: merchantTransactionsParams
      }
    );
  }

}
