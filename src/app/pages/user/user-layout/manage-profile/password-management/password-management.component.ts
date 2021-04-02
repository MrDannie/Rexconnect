import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { ValidationService } from 'src/app/core/validation.service';
import { ProfileManagementService } from 'src/app/pages/shared/services/profile-management.service';

@Component({
  selector: 'app-password-management',
  templateUrl: './password-management.component.html',
  styleUrls: ['./password-management.component.scss'],
})
export class PasswordManagementComponent implements OnInit {
  changePasswordForm: FormGroup;
  validationMessage: any;
  isUserCreating = false;
  permissions: any;

  constructor(
    private formBuilder: FormBuilder,
    private validationMessages: ValidationService,
    private profileMgt: ProfileManagementService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
    this.validationMessage = this.validationMessages;
  }

  ngOnInit() {
    this.initializeForm();
    this.getPermissions();
  }

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
  }
  initializeForm() {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      verifyPassword: ['', Validators.compose([Validators.required])],
    });
  }

  updatePassword(formValue) {
    this.isUserCreating = true;

    console.log(formValue);
    const val = {
      oldPassword: formValue.oldPassword,
      newPassword: formValue.newPassword,
    };

    this.profileMgt.updatePassword(val).subscribe(
      (response) => {
        console.log('response', response);
        this.isUserCreating = false;
        this.changePasswordForm.reset();
        this.alertService.success('Password updated successfully', true);
      },
      (error) => {
        console.log(error);
        this.isUserCreating = false;
        this.alertService.error(error, false);
      }
    );
  }
}
