import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { Config } from 'src/app/core/Config';
import { IUsers } from '../interfaces/User';
import { IRoles } from '../interfaces/Role';
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class UserLayoutService {
  bearerToken: string;
  constructor(private httpClient: HttpClient, private config: Config) {}

  // createAuthorizationHeader(): HttpHeaders {
  //   const bearer_token = localStorage.getItem('Genin');
  //   if (!isNullOrUndefined(bearer_token) || bearer_token !== null) {
  //     const Data = CryptoJS.AES.decrypt(bearer_token.toString(), 'Konohamaru');
  //     this.bearerToken = JSON.parse(Data.toString(CryptoJS.enc.Utf8));
  //     // console.log(this.bearerToken);
  //     this.bearerToken = this.bearerToken['accessToken'];
  //     let header = new HttpHeaders();
  //     header = header.append('Authorization', 'Bearer ' + this.bearerToken);
  //     return header;
  //   } else {
  //     return;
  //   }
  // }

  // SERVICES FOR USER MODULE

  // getAllUsers(pageIndex = 0, pageSize = 10): Observable<IUsers> {
  //   if (isNullOrUndefined(pageIndex) || isNullOrUndefined(pageSize)) {
  //     return this.httpClient.get<IUsers>(BASE_URL + '/v1/users').pipe(
  //       map((response: IUsers) => {
  //         console.log('FIRST ALL USERS', response);
  //         return response;
  //       })
  //     );
  //   } else {
  //     return this.httpClient
  //       .get<IUsers>(
  //         BASE_URL + '/v1/users?page=' + pageIndex + '&size=' + pageSize
  //       )
  //       .pipe(
  //         map((response: IUsers) => {
  //           console.log('ALL USERS', response);
  //           return response;
  //         })
  //       );
  //   }
  // }

  // createUser(userDetails: IUsers): Observable<IUsers> {
  //   return this.httpClient
  //     .post<IUsers>(BASE_URL + '/v1/users ', userDetails)
  //     .pipe(
  //       map((response: IUsers) => {
  //         console.log('User Addedd', response);
  //         return response;
  //       })
  //     );
  // }

  // getUsersRoles(category): Observable<IRoles> {
  //   return this.httpClient
  //     .get<IRoles>(BASE_URL + '/v1/roles?type=' + category)
  //     .pipe(
  //       map((response: IRoles) => {
  //         console.log('ROLES GOTTEN', response);
  //         return response;
  //       })
  //     );
  // }

  // getSingleUser(userId): Observable<IUsers> {
  //   return this.httpClient.get<IUsers>(BASE_URL + '/v1/users/' + userId).pipe(
  //     map((response: IUsers) => {
  //       console.log('SINGLE USER ', response);
  //       return response;
  //     })
  //   );
  // }

  // updateUser(userId, updateUser) {
  //   return this.httpClient
  //     .put<IUsers>(BASE_URL + '/v1/users/' + userId, updateUser)
  //     .pipe(
  //       map((response: IUsers) => {
  //         console.log('USER UPDATED', response);
  //         return response;
  //       })
  //     );
  // }
}
