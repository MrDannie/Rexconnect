// tslint:disable
import { Config } from 'src/app/core/Config';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';
import { ITerminal, IAddTerminal } from '../interfaces/terminals.model';
import { Observable } from 'rxjs';
import { IWrapper } from '../interfaces/wrapper.model';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class TerminalsService {

  bearerToken: string;
  config: Config;

  constructor(
    public httpClient: HttpClient
  ) {
    this.config = new Config();
  }

  createAuthorizationHeader(): HttpHeaders {
    const bearer_token = localStorage.getItem("Genin");
    if (!isNullOrUndefined(bearer_token) || bearer_token !== null) {
      const Data = CryptoJS.AES.decrypt(bearer_token.toString(), "Konohamaru");
      this.bearerToken = JSON.parse(Data.toString(CryptoJS.enc.Utf8));
      // console.log(this.bearerToken);
      this.bearerToken = this.bearerToken["accessToken"];
      let header = new HttpHeaders();
      header = header.append("Authorization", "Bearer " + this.bearerToken);
      return header;
    } else {
      return new HttpHeaders();
    }
  }

  /**
   * Api to get all terminals
   * @returns {Observable<ITerminals>
    *     }
    */
  getAllTerminals(pageIndex: number, pageSize: number, terminalId: string): Observable<IWrapper<ITerminal>> {
    const header = this.createAuthorizationHeader();
    const params = new HttpParams();
    const terminalsParams = params.append('page', pageIndex.toString()).append('size', pageSize.toString())
      .append('terminalId', terminalId);
    return this.httpClient.get<IWrapper<ITerminal>>(BASE_URL + this.config.allTerminals, {
      headers: header,
      params: terminalsParams
    });
  }

  addNewTerminal(terminalDetails: IAddTerminal): Observable<any> {
    const header = this.createAuthorizationHeader();
    return this.httpClient
      .post<IAddTerminal>(BASE_URL + this.config.addNewTerminal, terminalDetails, {
        headers: header
      });
  }

  uploadTerminals(formData) {
    const header = this.createAuthorizationHeader();
    header.append('Content-Type', 'multipart/form-data');
    return this.httpClient
      .post(BASE_URL + this.config.uploadTerminals, formData, {
        headers: header,
        reportProgress: true,
        observe: "events",
      });
  }

  /**
   * Api to update Terminal
   * @returns {Observable<ITerminals>
   */
  updateTerminal(terminalDetails: ITerminal, id): Observable<ITerminal> {
    const header = this.createAuthorizationHeader();
    return this.httpClient
      .put<ITerminal>(BASE_URL + this.config.updateTerminal.replace('{terminalId}', id), terminalDetails, {
        headers: header,
      });
  }

  getTerminal(id: string): Observable<ITerminal> {
    const headers = this.createAuthorizationHeader();
    return this.httpClient.get<ITerminal>(
      BASE_URL + this.config.getSingleTerminal.replace('{terminalId}', id), {
        headers
      }
    );
  }

}
