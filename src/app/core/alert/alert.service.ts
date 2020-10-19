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
    this.alert(AlertType.Success, message, keepAfterRouteChange);
  }

  error(error: any, keepAfterRouteChange = false) {
    let errorMessage = "";
    console.log("GOT HERE", error)
    if(typeof error === "string") {
      errorMessage = error
    } else {
      if (error.error.code === 401) {
        this.authService.logout();
      }
      if(error.error instanceof ErrorEvent) {
        errorMessage = "An Error Occured, Pls Try Again"
      } else if (error.error instanceof ProgressEvent) {
        errorMessage = "Unable to connect to the Internet"
      } else if (error.error instanceof ArrayBuffer) {
        errorMessage = "An error occured, Unable to generate reciept"
      } else {
        errorMessage = error.error.message
      }
    }

     window.scrollTo(0, 0);
     this.alert(AlertType.Success, errorMessage, keepAfterRouteChange,);
     }



  info(message: string, keepAfterRouteChange = false) {
   
    window.scrollTo(0, 0);
    this.alert(AlertType.Info, message, keepAfterRouteChange);
  }

  warn(message: string, keepAfterRouteChange = false) {
    window.scrollTo(0, 0);
    this.alert(AlertType.Warning, message, keepAfterRouteChange);
  }

  alert(
    type: AlertType,
    message: string,
    keepAfterRouteChange,
  ) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next({type, message } as Alert);
    setTimeout(() => {
      this.subject.next();
    }, 4000);
  }

  clear() {
    // clear alerts
    this.subject.next();
  }
}
