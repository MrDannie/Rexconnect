import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { Config } from 'src/app/core/Config';
import { AllRoles } from '../interfaces/AllRoles';
import { IPermissions } from '../interfaces/permissions';
import { IRole } from '../interfaces/Role';
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class RoleManagementService {
  constructor(private httpClient: HttpClient) {}

  getAllRoles(): Observable<AllRoles> {
    const pageSize = 1000;
    const pageIndex = 0;
    const params = new HttpParams();
    const requestParams = params
      .append('page', pageIndex.toString())
      .append('size', pageSize.toString());
    return this.httpClient
      .get<AllRoles>(BASE_URL + '/v1/roles', {
        params: requestParams,
      })
      .pipe(
        map((response: AllRoles) => {
          console.log('ROLES GOTTEN', response);
          return response;
        })
      );
  }

  getAllPermissions(): Observable<IPermissions> {
    return this.httpClient.get(BASE_URL + '/v1/permissions ').pipe(
      map((response: IPermissions) => {
        console.log('PERMISSIONS GOTTEN', response);
        return response;
      })
    );
  }

  createRole(roleDetails): Observable<IRole> {
    return this.httpClient.post(BASE_URL + '/v1/roles', roleDetails).pipe(
      map((response: IRole) => {
        return response;
      })
    );
  }

  updateRole(roleDetails, id): Observable<IRole> {
    return this.httpClient.put(BASE_URL + '/v1/roles/' + id, roleDetails).pipe(
      map((response: IRole) => {
        return response;
      })
    );
  }

  deleteRole(roleId): Observable<IRole> {
    return this.httpClient.delete(BASE_URL + '/v1/roles/' + roleId).pipe(
      map((response: IRole) => {
        return response;
      })
    );
  }
}
