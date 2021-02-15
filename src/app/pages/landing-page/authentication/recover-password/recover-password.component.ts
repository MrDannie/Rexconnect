import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ValidationService } from 'src/app/core/validation.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {
  recoverPassword: FormGroup;
  validationMessage: any;
  isLoading: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private validationMessages: ValidationService,
    private authService: AuthService,
    private router: Router,
    public alertService: AlertService
  ) {
    this.validationMessage = validationMessages;
  }

  ngOnInit() {
    this.initializeForm();
    localStorage.clear();
    this.isLoading = false;
  }

  initializeForm() {
    this.recoverPassword = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
    });
  }

  sendLink() {
    this.isLoading = true;
    console.log(this.recoverPassword.value);
    this.authService.sendLink(this.recoverPassword.value).subscribe(
      (response) => {
        console.log('response', response);
        this.isLoading = false;
        this.alertService.success('Link sent successfully', true);
        // this.router.navigate(["user"]);
      },
      (error) => {
        console.log(error);
        this.alertService.error(error, false);
        this.isLoading = false;
      }
    );
  }
}
