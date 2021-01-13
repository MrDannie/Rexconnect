import { StorageService } from "src/app/core/helpers/storage.service";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Config } from "../../../../core/Config";
import { environment } from "src/environments/environment";

const BASE_URL = environment.BASE_URL;
@Injectable({
  providedIn: 'root'
})
export class StationsService {

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private storageService: StorageService,
    private config: Config
  ) { }

  
  getAllStations(pageIndex, pageSize, searchFormValue?) {
    let params = new HttpParams();

    if (pageIndex) {
      params = params.append("pageIndex", pageIndex);
    }
    if (pageSize) {
      params = params.append("pageSize", pageSize);
    }
    if (searchFormValue.stationName) {
      params = params.append("stationName", searchFormValue.stationName);
    }

    return this.httpClient
      .get(BASE_URL + this.config.stations, { params })
      .pipe(
        map((stations) => {
          return stations;
        })
      );
  }

  createStation(stationDetails) {
    console.log(stationDetails);
    return this.httpClient.post(BASE_URL + this.config.stations, stationDetails);
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
