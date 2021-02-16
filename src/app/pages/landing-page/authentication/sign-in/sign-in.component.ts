
import { AlertService } from 'src/app/core/alert/alert.service';
import { AuthService } from 'src/app/core/auth/auth.service';

import { ValidationService } from 'src/app/core/validation.service';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { SharedService } from 'src/app/pages/shared/services/shared.service';
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  validationMessage: any;
  isLoading: boolean;

  errorMessage: string;
  constructor(
    private formBuilder: FormBuilder,
    private validationMessages: ValidationService,
    private authService: AuthService,
    private sharedService: SharedService,
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

    console.log('here is the login deatils', this.loginForm.value);
    this.isLoading = true;
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('Login User Data', response);
        // 1. STORE USER
        this.storageService.storeCurrentUser(response);
        this.sharedService.updateUserData();
        this.authService.getClientDetails().subscribe(
          (response) => {
            console.log('response2', response);
            //1. STORE CLIENT DETIALS
            this.alertService.success('Login Successful', true);
            this.router.navigate(['/user/dashboard']);
            this.storageService.storeClientDetails(response);
          },
          (error) => {
            //TODO:
            console.log('getClientDetails error', error);
            this.isLoading = false;
            this.alertService.error(error, false);
          }
        );

      },
      (error) => {
        console.log('login error', error);
        this.isLoading = false;
        this.alertService.error(error, false);

      }
    );

  }

  validateLogin() {

  }


}
