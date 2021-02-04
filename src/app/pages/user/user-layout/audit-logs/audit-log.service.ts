import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from 'src/app/core/Config';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { environment } from 'src/environments/environment';





const BASE_URL = environment.EXTERNAL_BASE_URL;
const APP_REF = environment.APP_REF;


@Injectable({
  providedIn: 'root'
})
export class AuditLogService {

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
    private config: Config
  ) { }



  getAuditLogs(pageIndex, pageSize, searchFormValue?) {
    
    const {clientId} = this.storageService.getCurrentUser()['user'];
    let params = new HttpParams();

    if (pageIndex) {
      params = params.append("offset", pageIndex);
    }
    if (pageSize) {
      params = params.append("limit", pageSize);
    }
    if (searchFormValue) {
      if (searchFormValue.name) {
        params = params.append("name", searchFormValue.name);
      }
      if (searchFormValue.status) {
        params = params.append("isActive", searchFormValue.status);
      }
    }
   

    return this.httpClient
      .get(`${BASE_URL}${this.config.auditLogs}${APP_REF}${clientId}` , { params })
      .pipe(
        map((stations) => {
          return stations;
        })
      );
  }

}
