import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
// import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';
import { Config } from 'src/app/core/Config';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class ProfileManagementService {
  constructor(private httpClient: HttpClient, private config: Config) {}

  updatePassword(updatedPassword): Observable<any> {
    return this.httpClient
      .post(BASE_URL + '/v1/users/change-password', updatedPassword)
      .pipe(map((response) => console.log(response)));
  }
}