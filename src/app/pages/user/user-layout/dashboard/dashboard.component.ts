import { Component, OnInit } from '@angular/core';
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
  topTerminals: any;
  topMerchants: any;
  currency: any;
  authService: any;
  constructor(private userLayoutService: UserLayoutService) {}

  ngOnInit() {
    // this.getDashboardCount();
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
}
