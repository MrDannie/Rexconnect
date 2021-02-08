import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from 'src/app/core/Config';
import { environment } from 'src/environments/environment';
import { isNullOrUndefined } from 'util';
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class PtspsService {
  constructor(private httpClient: HttpClient, private config: Config) {}

  getAllPtsps(pageIndex, pageSize, searchFormValue?) {
    console.log(searchFormValue);
    let params = new HttpParams();

    if (pageIndex) {
      params = params.append('page', pageIndex);
    }
    if (pageSize) {
      params = params.append('size', pageSize);
    }
    if (!isNullOrUndefined(searchFormValue)) {
      if (searchFormValue.Ptspname) {
        params = params.append('Ptspname', searchFormValue.Ptspname);
      }
      if (searchFormValue.status) {
        params = params.append('isActive', searchFormValue.status);
      }
    }

    return this.httpClient.get(BASE_URL + this.config.ptsps, { params }).pipe(
      map((ptsps) => {
        return ptsps;
      })
    );
  }

  getPTSP(id) {
    console.log(id);
    return this.httpClient.get(BASE_URL + this.config.ptsps + '/' + id);
  }

  updatePTSP(id, details) {
    console.log(id);
    return this.httpClient.put(
      BASE_URL + this.config.ptsps + '/' + id,
      details
    );
  }

  createPTSP(ptspDetails) {
    console.log(ptspDetails);
    return this.httpClient.post(BASE_URL + this.config.ptsps, ptspDetails);
  }
  deletePTSP(id) {
    console.log(id);
    return this.httpClient.delete(BASE_URL + this.config.ptsps + '/' + id);
  }
  disablePTSP(id) {
    console.log(id);
    return this.httpClient.post(
      BASE_URL + this.config.ptsps + '/' + id + '/disable',
      ''
    );
  }
  enablePTSP(id) {
    console.log(id);
    return this.httpClient.post(
      BASE_URL + this.config.ptsps + '/' + id + '/enable',
      ''
    );
  }
}
