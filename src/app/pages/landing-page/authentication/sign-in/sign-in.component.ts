import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { ValidationService } from 'src/app/core/validation.service';
import { SharedService } from 'src/app/pages/user/user-layout/shared/services/shared.service';

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

    private storageService: StorageService,
    private sharedService: SharedService
  ) {
    this.validationMessages = validationMessages;
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

  // LOGIN METHOD
  login() {
    this.isLoading = true;
    console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(
      (response) => {
        console.log('response', response);
        this.storageService.storeCurrentUser(response['data']);
        this.storageService.storeCurrentBusiness(
          response['data']['user'].businesses[0]
        );
        this.isLoading = false;
        this.sharedService.updateBusinessData();
        this.sharedService.updateUserData();
        this.sharedService.updateRoleData();
        // TODO: this.alertService.success('Login Successful', true); //TODO:
        console.log(response['data'].user.isVerifiedEmail);
        if (response['data'].user.businesses[0].isVerifiedBusiness) {
          console.log(response['data'].user.businesses[0].isVerifiedBusiness);

          this.router.navigate(['user']);
        } else {
          this.router.navigate(['user/incomplete-profile']);
        }
      },
      (error) => {
        console.log('error with Login', error);
      }
    );
  }
}
