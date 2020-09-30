import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { Alert, AlertType } from './alert';
import { Observable, Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { StorageService } from '../helpers/storage.service';

@Injectable()
export class AlertService {
  private subject = new Subject<Alert>();
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

  // error(error: any, keepAfterRouteChange = false) {
  //   console.log(error);
  //   this.alertId++;
  //   let message = '';

  //   if (error === undefined) {
  //     message = 'An error occurred , please try again';
  //   }
  //   if (error.error instanceof ErrorEvent) {
  //     message = 'An error occurred, pls try again';
  //   } else if (error.error instanceof ProgressEvent) {
  //     message = 'Unable to connect';
  //   }
  //   if (typeof error === 'string') {
  //     message = error;
  //     if (message === 'User Unauthorized') {
  //       this.authService.logout();
  //     }
  //   } else {
  //     if (!isNullOrUndefined(error.error) && error.error.code === 401) {
  //       if (this.storageService.getAdminDetails()) {
  //         this.authService.adminLogout();
  //       } else {
  //         this.authService.logout();
  //       }
  //     }

  //     if (isNullOrUndefined(error.error) && typeof error !== 'string') {
  //       error = 'An error occured';
  //     } else if (error === 'User Unauthorized') {
  //       if (this.storageService.getAdminDetails()) {
  //         this.authService.adminLogout();
  //       } else {
  //         this.authService.logout();
  //       }
  //     } else if (typeof error === 'string') {
  //       console.log('got here', typeof error);

  //       message = error;
  //     } else {
  //       message = error.error.message;
  //     }
  //   }

  //   window.scrollTo(0, 0);
  //   this.alert(AlertType.Error, message, keepAfterRouteChange, this.alertId);
  // }

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
    keepAfterRouteChange = false,
    alertId: number
  ) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<Alert>{ type: type, message: message, id: alertId });
    setTimeout(() => {
      this.subject.next();
    }, 4800);
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}
