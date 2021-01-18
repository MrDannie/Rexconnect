import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Config } from 'src/app/core/Config';
import { environment } from "src/environments/environment";
const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class PtspsService {

  constructor(
    private httpClient: HttpClient,
    private config: Config
  ) { }

  
  getAllPtsps(pageIndex, pageSize, searchFormValue?) {
    let params = new HttpParams();

    if (pageIndex) {
      params = params.append("offset", pageIndex);
    }
    if (pageSize) {
      params = params.append("limit", pageSize);
    }
    if (searchFormValue.name) {
      params = params.append("name", searchFormValue.name);
    }
    if (searchFormValue.status) {
      params = params.append("isActive", searchFormValue.status);
    }

    return this.httpClient
      .get(BASE_URL + this.config.ptsps, { params })
      .pipe(
        map((ptsps) => {
          return ptsps;
        })
      );
  }

  getStation(id) {
    console.log(id);
    return this.httpClient.get(BASE_URL + this.config.stations + '/' + id);
  }

  updateStation(id, details) {
    console.log(id);
    return this.httpClient.put(BASE_URL + this.config.stations + '/' + id, details);
  }

  createStation(stationDetails) {
    console.log(stationDetails);
    return this.httpClient.post(BASE_URL + this.config.stations, stationDetails);
  }
  deleteStation(id) {
    console.log(id);
    return this.httpClient.delete(BASE_URL + this.config.stations + '/' + id);
  }
  disableStation(id) {
    console.log(id);
    return this.httpClient.post(BASE_URL + this.config.stations + '/' + id + '/disable', '');
  }
  enableStation(id) {
    console.log(id);
    return this.httpClient.post(BASE_URL + this.config.stations + '/' + id + '/enable', '');
  }
  // updateMerchant(merchantDetails) {
  //   console.log(merchantDetails);
  //   return this.httpClient.post(BASE_URL + this.config.updateMerchant, merchantDetails);
  // }
  // deleteMerchant(code: string) {
  //   console.log(code);
  //   return this.httpClient.post(BASE_URL + this.config.deleteMerchant + '/' + code, {});
  // }
}

