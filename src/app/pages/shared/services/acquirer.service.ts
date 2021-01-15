import { HttpClient } from '@angular/common/http';
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

  getAllAcquirer(): Observable<any> {
    return this.http.get<any>(BASE_URL + this.config.getAllAcquirers);
  }

  getPtspsList(): Observable<any> {
    return this.http.get<any>(BASE_URL + this.config.getPtspsList);
  }
}
