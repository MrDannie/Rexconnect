import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import * as CryptoJS from 'crypto-js';

import { ValidationService } from 'src/app/core/validation.service';
import { StorageService } from 'src/app/core/helpers/storage.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  validationMessage: any;
  isLoading: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private validationMessages: ValidationService,
    private authService: AuthService,
    private router: Router,
    public alertService: AlertService,
    private storageService: StorageService
  ) {
    this.validationMessage = validationMessages;
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  login() {
    this.isLoading = true;
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('Login User Data', response);
        // 1. STORE USER
        this.storageService.storeCurrentUser(response);
        this.authService.getClientDetails().subscribe(
          (response) => {
            console.log('response2', response);
            //1. STORE CLIENT DETIALS
            this.storageService.storeClientDetails(response);
          },
          (error) => {
            //TODO:
          }
        );
        this.alertService.success('Login Successful', true);
        this.router.navigate(['/user/dashboard']);
      },
      (error) => {
        console.log('Error Encountered Logging in', error);
        window.scrollTo(0, 0);
        this.isLoading = false;
        // this.alertService.error(error, false);TODO:
      }
    );
  }

  // LOGIN METHOD
  // login() {
  //   this.isLoading = true;
  //   console.log(this.loginForm.value);
  //   this.authService.login(this.loginForm.value).subscribe(
  //     (response) => {
  //       console.log('response', response);
  //       this.storageService.storeCurrentUser(response['data']);
  //       this.storageService.storeCurrentBusiness(
  //         response['data']['user'].businesses[0]
  //       );
  //       this.isLoading = false;
  //       this.sharedService.updateBusinessData();
  //       this.sharedService.updateUserData();
  //       this.sharedService.updateRoleData();
  //       // TODO: this.alertService.success('Login Successful', true); //TODO:
  //       console.log(response['data'].user.isVerifiedEmail);
  //       if (response['data'].user.businesses[0].isVerifiedBusiness) {
  //         console.log(response['data'].user.businesses[0].isVerifiedBusiness);

  //         this.router.navigate(['user/dashboard']);
  //       } else {
  //         this.router.navigate(['user/incomplete-profile']);
  //       }
  //     },
  //     (error) => {
  //       console.log('error with Login', error);
  //     }
  //   );
  // }
}
