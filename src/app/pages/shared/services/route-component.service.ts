import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Config } from 'src/app/core/Config';

import { environment } from 'src/environments/environment';
import { RoutingRulesInterface } from '../interfaces/routing-rules.model';

const BASE_URL: string = environment.BASE_URL;

export interface SearchRoutingRules {
  defaultDs: string;
  ruletype: string;
}

@Injectable({
  providedIn: 'root',
})
export class RouteComponentService {
  config: Config;

  constructor(private http: HttpClient) {
    this.config = new Config();
  }

  getAllRoutingRules(pageIndex, pageSize, options): Observable<any> {
    console.log('OPTIONS IN ROUTE SERVICE', options);

    let params = new HttpParams();

    if (pageIndex) {
      params = params.append('page', pageIndex.toString());
    }
    if (pageSize) {
      params = params.append('size', pageSize.toString());
    }
    if (options) {
      if (options.default_ds) {
        params = params.append('default_ds', options.default_ds);
      }
      if (options.rule) {
        params = params.append('rule', options.rule);
      }
    }

    return this.http
      .get<RoutingRulesInterface>(BASE_URL + '/v1/routing-rules', {
        params: params,
      })
      .pipe(
        map((response: RoutingRulesInterface) => {
          return response;
        })
      );
  }

  // /v1/routing-rules/:id
  editRoute(routeConfigurations, routeId): Observable<any> {
    return this.http
      .put<any>(BASE_URL + '/v1/routing-rules/' + routeId, routeConfigurations)
      .pipe(
        map((response) => {
          console.log('routing rule rtesponse');
          return response;
        })
      );
  }

  createRoutingRule(routeConfigurations): Observable<any> {
    return this.http
      .post<any>(BASE_URL + '/v1/routing-rules', routeConfigurations)
      .pipe(
        map((response) => {
          console.log('routing rule rtesponse');
          return response;
        })
      );
  }

  getSingleRoute(routeId): Observable<any> {
    return this.http.get(BASE_URL + '/v1/routing-rules/' + routeId).pipe(
      map((response) => {
        console.log('routing rule rtesponse', response);
        return response;
      })
    );
  }

  getAllStations(): Observable<any> {
    return this.http.get(BASE_URL + '/v1/stations/').pipe(
      map((response) => {
        console.log('All Statioons', response);
        return response;
      })
    );
  }

  getAcquirerRoutes(pageIndex, pageSize, acquirerId): Observable<any> {
    const params = new HttpParams();
    const requestParams = params
      .append('page', pageIndex.toString())
      .append('size', pageSize.toString());
    return this.http.get<any>(
      BASE_URL + '/v1/clients/' + acquirerId + '/routes',
      {
        params: requestParams,
      }
    );
  }

  getAcquirerPtsps(pageIndex, pageSize, acquirerId): Observable<any> {
    const params = new HttpParams();
    const requestParams = params
      .append('page', pageIndex.toString())
      .append('size', pageSize.toString());
    return this.http.get<any>(
      BASE_URL + '/v1/clients/' + acquirerId + '/ptsps',
      {
        params: requestParams,
      }
    );
  }

  disableRoute(routeId): Observable<any> {
    return this.http.post<any>(
      BASE_URL + this.config.disableRoute.replace('{routeId}', routeId),
      ''
    );
  }

  enableRoute(routeId): Observable<any> {
    return this.http.post<any>(
      BASE_URL + this.config.enableRoute.replace('{routeId}', routeId),
      ''
    );
  }
}
