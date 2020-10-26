import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { ValidationService } from 'src/app/core/validation.service';
import { ProfileManagementService } from 'src/app/pages/shared/services/profile-management.service';

@Component({
  selector: 'app-password-management',
  templateUrl: './password-management.component.html',
  styleUrls: ['./password-management.component.scss'],
})
export class PasswordManagementComponent implements OnInit {
  changePasswordForm: FormGroup;
  validationMessage: ValidationService;
  isUserCreating = false;

  constructor(
    private formBuilder: FormBuilder,
    private validationMessages: ValidationService,
    private profileMgt: ProfileManagementService,
    private alertService: AlertService
  ) {
    this.validationMessage = validationMessages;
  }

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      verifyPassword: ['', Validators.compose([Validators.required])],
    });
  }

  updatePassword(formValue) {
    this.isUserCreating = true;

    // console.log(value);

    this.profileMgt.updatePassword(formValue).subscribe(
      (response) => {
        console.log('response', response);
        this.isUserCreating = false;
        this.changePasswordForm.reset();
        this.alertService.success('Password updated successfully', true);
      },
      (error) => {
        console.log(error);
        this.isUserCreating = false;

        this.alertService.error(error.error.message, false);
      }
    );
  }
}
