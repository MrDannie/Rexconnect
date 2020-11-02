import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
// import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { Config } from 'src/app/core/Config';
import { IUser } from '../interfaces/user';
import { AllUsers } from '../interfaces/AllUsers';
import { AllRoles } from '../interfaces/AllRoles';
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  constructor(private httpClient: HttpClient, private config: Config) {}

  getAllUsers(
    pageIndex = 0,
    pageSize = 10,
    firstName?,
    lastName?,
    roleId?
  ): Observable<AllUsers> {
    if (isNullOrUndefined(pageIndex) || isNullOrUndefined(pageSize)) {
      return this.httpClient.get<AllUsers>(BASE_URL + '/v1/users').pipe(
        map((response: AllUsers) => {
          console.log('FIRST ALL USERS', response);
          return response;
        })
      );
    } else {
      const params = new HttpParams();
      //  const requestParams = params.append('') //TODO:
      return this.httpClient
        .get<AllUsers>(
          BASE_URL + '/v1/users?page=' + pageIndex + '&size=' + pageSize
        )
        .pipe(
          map((response: AllUsers) => {
            console.log('ALL USERS', response);
            return response;
          })
        );
    }
  }

  getUsersRoles(category): Observable<AllRoles> {
    return this.httpClient
      .get<AllRoles>(BASE_URL + '/v1/roles?type=' + category)
      .pipe(
        map((response: AllRoles) => {
          console.log('ROLES GOTTEN', response);
          return response;
        })
      );
  }

  getSingleUser(userId): Observable<IUser> {
    return this.httpClient.get<IUser>(BASE_URL + '/v1/users/' + userId).pipe(
      map((response: IUser) => {
        console.log('SINGLE USER ', response);
        return response;
      })
    );
  }

  createUser(userDetails: IUser): Observable<IUser> {
    return this.httpClient
      .post<IUser>(BASE_URL + '/v1/users ', userDetails)
      .pipe(
        map((response: IUser) => {
          console.log('User Addedd', response);
          return response;
        })
      );
  }

  updateUser(userId, updateUser) {
    return this.httpClient
      .put<IUser>(BASE_URL + '/v1/users/' + userId, updateUser)
      .pipe(
        map((response: IUser) => {
          console.log('USER UPDATED', response);
          return response;
        })
      );
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.httpClient.delete(BASE_URL + '/v1/users/' + userId).pipe(
      map((response) => {
        console.log('USER DELETED', response);
        return true;
      })
    );
  }
}
