// tslint:disable
import { ITransaction } from './../interfaces/transactions.model';
import { ITerminal } from './../interfaces/terminals.model';
import { IMerchant } from './../interfaces/merchants.model';
import { IWrapper } from './../interfaces/wrapper.model';
import { Config } from './../../../core/Config';
import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import * as CryptoJS from 'crypto-js';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/core/helpers/storage.service';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class MerchantsService {
  bearerToken: string;
  config: Config;
  typeOfUserLoggedIn: any;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {
    this.config = new Config();
    this.typeOfUserLoggedIn = this.storageService.getCurrentUser().user.userType;
    console.log('USERTYPE VARIABLE', this.typeOfUserLoggedIn);
  }

  createAuthorizationHeader(): HttpHeaders {
    const bearer_token = localStorage.getItem('Genin');
    if (!isNullOrUndefined(bearer_token) || bearer_token !== null) {
      const Data = CryptoJS.AES.decrypt(bearer_token.toString(), 'Konohamaru');
      this.bearerToken = JSON.parse(Data.toString(CryptoJS.enc.Utf8));
      this.bearerToken = this.bearerToken['accessToken'];
      let header = new HttpHeaders();
      header = header.append('Authorization', 'Bearer ' + this.bearerToken);
      return header;
    } else {
      return;
    }
  }

  getMerchantList(): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.http.get(BASE_URL + this.config.getMerchantsList, {
      headers: header,
    });
  }

  getAllMerchants(
    pageIndex: number,
    pageSize: number,
    merchantId?: string,
    status?,
    acquirerId?
  ): Observable<IWrapper<IMerchant>> {
    let params = new HttpParams();
    if (pageIndex) {
      params = params.append('page', pageIndex.toString());
    }
    if (pageSize) {
      params = params.append('size', pageSize.toString());
    }
    if (merchantId) {
      params = params.append('merchantId', merchantId);
    }

    if (status) {
      params = params.append('isActive', status);
    }

    return this.http.get<IWrapper<IMerchant>>(
      BASE_URL + this.config.getAllMerchants,
      {
        params,
      }
    );
  }

  getMerchantTerminals(merchantId): Observable<IWrapper<ITerminal>> {
    const header = this.createAuthorizationHeader();
    return this.http.get<IWrapper<ITerminal>>(
      BASE_URL +
        this.config.getMerchantTerminals.replace('{merchantId}', merchantId),
      {
        headers: header,
      }
    );
  }

  getTimezones(): Observable<any> {
    return this.http.get<any>(BASE_URL + '/v1/timezones');
  }

  getMerchant(merchantId: string): Observable<IMerchant> {
    const header = this.createAuthorizationHeader();
    return this.http.get<IMerchant>(
      BASE_URL +
        this.config.getSingleMerchant.replace('{merchantId}', merchantId),
      {
        headers: header,
      }
    );
  }

  getAllCities(countryCode): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.http.get(
      BASE_URL + this.config.getStates.replace('{countryCode}', countryCode),
      {
        headers: header,
      }
    );
  }

  addNewMerchant(merchantDetails): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.http.post(
      BASE_URL + this.config.addNewMerchant,
      JSON.stringify(merchantDetails),
      {
        headers: header,
      }
    );
  }

  updateMerchant(merchantId, merchantDetails): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.http.put(
      BASE_URL +
        this.config.getSingleMerchant.replace('{merchantId}', merchantId),
      merchantDetails,
      {
        headers: header,
      }
    );
  }

  adminUpdateMerchantForAcquirer(
    clientId,
    merchantId,
    merchantDetails
  ): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.http.put(
      BASE_URL +
        this.config.adminUpdateMerchant
          .replace('{acquirerId}', clientId)
          .replace('{merchantId}', merchantId),
      merchantDetails,
      {
        headers: header,
      }
    );
  }

  // v1/clients/:clientId/merchants/:merchantId

  getMerchantTransactions(
    merchantId: string,
    pageIndex: number,
    pageSize: number
  ): Observable<IWrapper<ITransaction>> {
    const header = this.createAuthorizationHeader();

    const params = new HttpParams();
    const merchantTransactionsParams = params
      .append('merchantId', merchantId)
      .append('page', pageIndex.toString())
      .append('size', pageSize.toString());

    return this.http.get<IWrapper<ITransaction>>(
      BASE_URL + this.config.getTransactions,
      {
        headers: header,
        params: merchantTransactionsParams,
      }
    );
  }

  disableMerchant(merchantId): Observable<any> {
    return this.http.post<any>(
      BASE_URL +
        this.config.disableMerchant.replace('{merchantId}', merchantId),
      ''
    );
  }

  enableMerchant(merchantId): Observable<any> {
    return this.http.post<any>(
      BASE_URL + this.config.enableMerchant.replace('{merchantId}', merchantId),
      ''
    );
  }

  // GA ADMIN ENDPONTS

  adminGetAllMerchantsForAcquirer(
    pageIndex: number,
    pageSize: number,
    merchantId?: string,
    status?,
    acquirerId?
  ): Observable<IWrapper<IMerchant>> {
    let params = new HttpParams();
    if (pageIndex) {
      params = params.append('page', pageIndex.toString());
    }
    if (pageSize) {
      params = params.append('size', pageSize.toString());
    }
    if (merchantId) {
      params = params.append('merchantId', merchantId);
    }

    if (status) {
      params = params.append('isActive', status);
    }

    return this.http.get<IWrapper<IMerchant>>(
      BASE_URL +
        this.config.getAllMerchantsForAcquirer.replace(
          '{clientId}',
          acquirerId
        ),
      {
        params,
      }
    );
  }

  getMerchantDetailsForAdmin(clientId, merchantId) {
    const header = this.createAuthorizationHeader();
    return this.http.get<IMerchant>(
      BASE_URL +
        this.config.getSingleMerchantForAdmin
          .replace('{merchantId}', merchantId)
          .replace('{clientId}', clientId),
      {
        headers: header,
      }
    );
  }

  adminAddNewMerchant(merchantDetails, clientId): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.http.post(
      BASE_URL +
        this.config.adminAddNewMerchant.replace('{clientId}', clientId),
      JSON.stringify(merchantDetails),
      {
        headers: header,
      }
    );
  }

  // adminGetMerchantTransactionsForAcquirer(
  //   acquirerId: string,
  //   merchantId: string,
  //   pageIndex: number,
  //   pageSize: number
  // ): Observable<IWrapper<ITransaction>> {
  //   const header = this.createAuthorizationHeader();

  //   const params = new HttpParams();
  //   const merchantTransactionsParams = params
  //     .append('merchantId', merchantId)
  //     .append('page', pageIndex.toString())
  //     .append('size', pageSize.toString());

  //   return this.http.get<IWrapper<ITransaction>>(
  //     BASE_URL +
  //       this.config.adminGetMerchantTransactionsForAcquirer
  //         .replace('{clientId}', merchantId)
  //         .replace('{acquirerId}', acquirerId),
  //     {
  //       headers: header,
  //       params: merchantTransactionsParams,
  //     }
  //   );
  // }

  adminGetMerchantTransactionsForAcquirers(
    clientId,
    pageIndex: number,
    pageSize: number
  ): Observable<IWrapper<ITransaction>> {
    const header = this.createAuthorizationHeader();

    const params = new HttpParams();
    const merchantTransactionsParams = params
      .append('page', pageIndex.toString())
      .append('size', pageSize.toString());

    return this.http.get<IWrapper<ITransaction>>(
      BASE_URL +
        this.config.getTransactionsForAcquirer.replace('{clientId}', clientId),
      {
        headers: header,
        params: merchantTransactionsParams,
      }
    );
  }
}
