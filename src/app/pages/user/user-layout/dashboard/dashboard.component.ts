import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { UserLayoutService } from 'src/app/pages/shared/services/user-layout.service';

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
  constructor(private userLayoutService: UserLayoutService) {}

  ngOnInit() {
    // this.getDashboardCount();
    // this.getTopTerminalStat();
    // this.getTopMerchants();
  }

  getDashboardCount() {
    this.userLayoutService.getDashboardCount().subscribe(
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
    this.userLayoutService.getTopTerminalStat().subscribe(
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
    this.userLayoutService.getTopMerchantsStat().subscribe(
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
