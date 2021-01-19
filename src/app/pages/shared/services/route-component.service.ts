import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { RoutingRulesInterface } from '../interfaces/routing-rules.model';

const BASE_URL: string = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class RouteComponentService {
  constructor(private http: HttpClient) {}

  getAllRoutingRules(pageIndex, pageSize): Observable<RoutingRulesInterface> {
    const params = new HttpParams();
    const requestParams = params
      .append('page', pageIndex.toString())
      .append('size', pageSize.toString());
    return this.http
      .get<RoutingRulesInterface>(BASE_URL + '/v1/routing-rules', {
        params: requestParams,
      })
      .pipe(
        map((response: RoutingRulesInterface) => {
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

  getAcquirerRoutes(pageIndex, pageSize): Observable<any> {
    const params = new HttpParams();
    const requestParams = params
      .append('page', pageIndex.toString())
      .append('size', pageSize.toString());
    return this.http.get<any>(BASE_URL + '/v1/clients/routes', {
      params: requestParams,
    });
  }
}
