// tslint:disable
import { PaginationService } from './../../pagination.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AlertService } from '../alert.service';
import { Alert, AlertType } from '../alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, AfterViewInit {
  alerts: Alert[] = [];

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    console.log('initialized...');

    this.alertService.getAlert().subscribe((alert: Alert) => {
      console.log(alert);
      if (!alert) {
        // clear alerts when an empty alert is received
        this.alerts = [];
        return;
      }

      // add alert to array
      console.log(alert);

      this.alerts.push(alert);
    });
    console.log('does this even get called at all?');

  }

  ngAfterViewInit() {
  }

  removeAlert(alert: Alert) {
    this.alerts = this.alerts.filter((x) => x !== alert);
  }

  cssClass(alert: Alert) {
    if (!alert) {
      return;
    }

    // return css class based on alert type
    switch (alert.type) {
      case AlertType.Success:
        return 'alert alert-success alert-dismissible fade show animated col-md-5 center-card text-center';
      case AlertType.Error:
        return 'alert  alert-danger alert-dismissible fade show animated  col-md-5 error-alert center-card text-center';
      case AlertType.Info:
        return 'alert alert-info alert-dismissible fade show animated col-md-5 error-alert center-card text-center';
      case AlertType.Warning:
        return 'alert alert-warning';
    }
  }
}
