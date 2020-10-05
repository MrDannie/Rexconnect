import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/pages/shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardCount: any;
  stillLoading: boolean;
  errorMessage: string;
  errorExists: boolean;
  currency: any;
  authService: any;
  topTerminalStatistics: any;
  topMerchantsStatistics: any;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.getDashboardCount();
    this.getTopTerminalStat();
    this.getTopMerchants();
  }

  getDashboardCount() {
    this.dashboardService.getDashboardCount().subscribe(
      (response) => {
        // console.log('Resp ', response);
        this.dashboardCount = response;
        window.scrollTo(0, 0);
      },
      (error) => {
        console.log('Error Encountered ', error);
        this.authService.tokenValidator(error);
        this.errorMessage = 'Error : ' + error.error.message;
        this.errorExists = true;
        window.scrollTo(0, 0);
        // this.removeError();
      }
    );
  }
  getTopTerminalStat() {
    this.dashboardService.getTopTerminalStat().subscribe(
      (response) => {
        console.log('TOP TERMINAL STAT', response);
        this.topTerminalStatistics = response;
        window.scrollTo(0, 0);
      },
      (error) => {
        console.log('Error Encountered ', error); //TODO:
        this.authService.tokenValidator(error);
        this.errorMessage = 'Error : ' + error.error.message;
        this.errorExists = true;
        window.scrollTo(0, 0);
        // this.removeError();TODO:
      }
    );
  }
  getTopMerchants() {
    this.dashboardService.getTopMerchantsStat().subscribe(
      (response) => {
        console.log('TOP MERCHNATS STAT', response);
        this.topMerchantsStatistics = response;
        window.scrollTo(0, 0);
      },
      (error) => {
        console.log('Error Encountered ', error);
        this.authService.tokenValidator(error);
        this.errorMessage = 'Error : ' + error.error.message;
        this.errorExists = true;
        window.scrollTo(0, 0);
        // this.removeError(); TODO:
      }
    );
  }
}
