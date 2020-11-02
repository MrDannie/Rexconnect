import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-top-navigation',
  templateUrl: './top-navigation.component.html',
  styleUrls: ['./top-navigation.component.scss'],
})
export class TopNavigationComponent implements OnInit {
  currentUser: any = '';
  constructor(
    private authService: AuthService,
    private sharedService: SharedService
  ) {
    this.getUserData();
    this.getUserRole();
    this.getUserBusinessData();
  }
  getUserBusinessData() {
    // throw new Error('Method not implemented.');
  }
  getUserRole() {
    // throw new Error('Method not implemented.');
  }
  getUserData() {
    // throw new Error('Method not implemented.');
    this.sharedService.userDataObservable$.subscribe((response) => {
      this.currentUser = response.user;
      console.log('User in TOp Nav', this.currentUser);
    });
  }

  ngOnInit(): void {}

  logOut() {
    this.authService.logout();
  }
}
