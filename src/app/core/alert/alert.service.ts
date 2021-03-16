import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Alert, AlertType } from './alert';
import { Observable, Subject } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  public subject = new Subject<Alert>();
  private keepAfterRouteChange = false;
  alertId: number = 0;

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService
  ) {
    // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
    router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterRouteChange) {
          // only keep for a single route change
          this.keepAfterRouteChange = false;
        } else {
          // clear alert messages
          this.clear();
        }
      }
    });
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message: string, keepAfterRouteChange = true) {
    window.scrollTo(0, 0);
    this.alert(AlertType.Success, message, keepAfterRouteChange, this.alertId);
  }

  error(error: any, keepAfterRouteChange = false) {
    console.log(error);
    console.log(error.error);

    let errorMessage = '';
    this.alertId++;
    if (typeof error === 'string') {
      errorMessage = error;
    } else {
      if (error.error.error.code === 401) {
        console.log('logging put');

        this.authService.logout();
      }

      if (error.error instanceof ErrorEvent) {
        errorMessage = 'An Error Occured, Pls Try Again';
      } else if (error.error instanceof ProgressEvent) {
        errorMessage = 'Unable to connect to the Internet';
      } else if (error.error instanceof ArrayBuffer) {
        errorMessage = 'An error occured, Unable to generate reciept';
      } else if (error.error.error) {
        errorMessage = error.error.error.responseMessage;
      } else {
        errorMessage = 'Error connecting, please try again';
      }

      if (typeof error === 'string') {
        errorMessage = error;
        if (errorMessage === 'User Unauthorized') {
          this.authService.logout();
        }
        if (errorMessage === 'jwt expired') {
          this.authService.logout();
        }
      }
    }

    console.log(errorMessage);

    window.scrollTo(0, 0);
    this.alert(
      AlertType.Error,
      errorMessage,
      keepAfterRouteChange,
      this.alertId
    );
  }

  info(message: string, keepAfterRouteChange = false) {
    this.alertId++;
    window.scrollTo(0, 0);
    this.alert(AlertType.Info, message, keepAfterRouteChange, this.alertId);
  }

  warn(message: string, keepAfterRouteChange = false) {
    this.alertId++;
    window.scrollTo(0, 0);
    this.alert(AlertType.Warning, message, keepAfterRouteChange, this.alertId);
  }

  alert(
    type: AlertType,
    message: string,
    keepAfterRouteChange,
    alertId: number
  ) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    console.log('getting into the alert method too');
    this.subject.next(<Alert>{ type, message, id: alertId });
    setTimeout(() => {
      this.subject.next();
    }, 4000);
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}
