import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { ValidationService } from 'src/app/core/validation.service';
import { ProfileManagementService } from 'src/app/pages/shared/services/profile-management.service';

@Component({
  selector: 'app-admin-settings',
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss'],
})
export class AdminSettingsComponent implements OnInit {
  public updateSettingsForm: FormGroup;
  public validationMessage: any;
  public isUpdating: boolean;
  public isLoading: boolean;
  permissions: any;

  constructor(
    private formBuilder: FormBuilder,
    private validationMessages: ValidationService,
    private storageService: StorageService,
    private alertService: AlertService,
    private profileMgt: ProfileManagementService
  ) {
    this.validationMessage = this.validationMessages;
  }

  public ngOnInit() {
    this.initializeForm();
    this.getUserSettings();
    this.isUpdating = false;
    this.getPermissions();
  }
  public getUserSettings() {
    this.profileMgt.getUserSettings().subscribe(
      (response) => {
        response.terminalPrefix.join(',');
        console.log(response);
        this.updateSettingsForm.patchValue(response);
        this.isUpdating = false;
      },
      (error) => {
        this.isUpdating = false;
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
  }

  public initializeForm() {
    this.updateSettingsForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      terminalPrefix: ['', Validators.compose([Validators.required])],
      logo_url: [''],
      location: ['', Validators.compose([Validators.required])],
      currencyCode: ['', Validators.compose([Validators.required])],
      color: [''],
      auto_mid: [''],
      auto_tid: [''],
      address: ['', Validators.compose([Validators.required])],
      shortName: ['', Validators.compose([Validators.required])],
      bankCode: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
    });
  }

  public updateSettings(value) {
    this.isUpdating = true;
    console.log(value);
    console.log(typeof value.terminalPrefix);

    if (typeof value.terminalPrefix === 'string') {
      value.terminalPrefix = value.terminalPrefix.replace(/\s+/g, '');

      value.terminalPrefix = value.terminalPrefix.split(',');
    }
    console.log(value);

    this.profileMgt.updateUserSettings(value).subscribe(
      (resp) => {
        this.isUpdating = false;
        this.alertService.success('Settings Updated Sucessfully');
        this.getUserSettings();
      },
      (error) => {
        console.log(error);
        this.isUpdating = false;
        this.alertService.error(error);
      }
    );
  }
}
