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
    pageIndex: number,
    pageSize: number,
    username?: string,
    email?: string,
    enabled?: string
  ) {
    let params = new HttpParams();
    if (pageIndex) {
      params = params.append('page', pageIndex.toString());
    }
    if (pageSize) {
      params = params.append('size', pageSize.toString());
    }
    if (username) {
      params = params.append('username', username);
    }
    if (email) {
      params = params.append('email', email);
    }
    if (enabled) {
      params = params.append('enabled', enabled);
    }

    return this.httpClient.get<AllUsers>(BASE_URL + '/v1/users', {
      params: params,
    });
  }

  // makeRequest(requestParams) {}

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
