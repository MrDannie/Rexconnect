import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent implements OnInit {
  public currentUser: any = '';
  public ac: any = '';

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
  ) {

    this.sharedService.userData$.subscribe((res) => {
      //      console.log(res);
      this.ac = res.user;
      console.log('accccc', this.ac);
      

    });

    this.getUserData();
    
  }
 
  public getUserData() {
    this.sharedService.userData$.subscribe((response) => {
      this.currentUser = response.user;
      console.log('User in TOp Nav', this.currentUser);
    });
  }

  public ngOnInit(): void {}

  public logOut() {
    this.authService.logout();
  }
}
