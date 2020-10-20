import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
// tslint:disable
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandler {

  constructor(
    private alertService: AlertService,
    private router: Router
  ) { }

  customClientErrors(title: string, statusCode: number = 0, message: string) {

    if (statusCode > 399 && statusCode < 500 ) {
      this.alertService.warn(`${ title }: ${message}`, true);
    }
    if (statusCode === 502 ){
      this.alertService.warn('The server is busy, Kindly try again later', true);
    }
    if (statusCode > 499){
      this.alertService.warn(`${ title }: ${message}`, true);
    }
    if (statusCode === 0){
      this.alertService.warn('Connection Failed!: Cannot connect to the server.', true);
    }

    if (statusCode === 401 && message !== 'Either username or credential provided is invalid'){
      this.router.navigate(['/sign-in']);
      // this.alertService.Warning("Expired Session","oops! Kindly Login again")
    }
    if (statusCode === 401){
      // delete user tokens
      this.router.navigate(['/sign-in']);
    }

    if (statusCode == 401) {
      this.alertService.warn('Token Expired, You need to login again', true);
      this.router.navigate(['/sign-in']);
    }
  }

}
