import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Config } from 'src/app/core/Config';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class AcquirerService {
  config: Config;

  constructor(private http: HttpClient) {
    this.config = new Config();
  }

  getAllAcquirer(
    pageIndex: number,
    pageSize: number,
    clientName?,
    bankCode?,
    status?
  ): Observable<any> {
    let params = new HttpParams();
    if (pageIndex) {
      params = params.append('page', pageIndex.toString());
    }
    if (pageSize) {
      params = params.append('size', pageSize.toString());
    }
    if (clientName) {
      params = params.append('clientName', clientName);
    }
    if (bankCode) {
      params = params.append('bankCode', bankCode);
    }
    if (status) {
      params = params.append('status', status);
    }

    return this.http.get<any>(BASE_URL + this.config.getAllAcquirers, {
      params: params,
    });
  }

  getPtspsList(): Observable<any> {
    return this.http.get<any>(BASE_URL + this.config.getPtspsList);
  }

  getSingleAcquirer(acquirerId): Observable<any> {
    return this.http.get<any>(
      BASE_URL + this.config.getSingleAcquirer.replace('{clientId}', acquirerId)
    );
  }

  getRoutesList(): Observable<any> {
    return this.http.get<any>(BASE_URL + this.config.getRoutesLists);
  }

  disableAcquirer(acquirerId): Observable<any> {
    return this.http.post<any>(
      BASE_URL +
        this.config.disableAcquirer.replace('{acquirerId}', acquirerId),
      ''
    );
  }

  enableAcquirer(acquirerId): Observable<any> {
    return this.http.post<any>(
      BASE_URL + this.config.enableAcquirer.replace('{acquirerId}', acquirerId),
      ''
    );
  }

  getAcquirerPtspsList(): Observable<any> {
    return this.http.get<any>(BASE_URL + this.config.getAquirerPtspList);
  }

  addAcquirer(acquirerDetails): Observable<any> {
    return this.http.post<any>(BASE_URL + '/v1/clients', acquirerDetails);
  }

  updateAcquirer(acquirerDetails, acquirerId): Observable<any> {
    return this.http.put<any>(
      BASE_URL + '/v1/clients/' + acquirerId,
      acquirerDetails
    );
  }
}
