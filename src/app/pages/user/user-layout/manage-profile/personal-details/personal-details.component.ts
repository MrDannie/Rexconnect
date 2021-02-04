import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { ValidationService } from 'src/app/core/validation.service';
import { ProfileManagementService } from 'src/app/pages/shared/services/profile-management.service';
import { SharedService } from 'src/app/pages/shared/services/shared.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {
  public updateUserForm: FormGroup;
  public validationMessage: any;
  public isUpdating: boolean;
  public isLoading: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private validationMessages: ValidationService,
    private storageService: StorageService,
    private profileMgt: ProfileManagementService,
    private alertService: AlertService,
    private sharedService: SharedService,
  ) {
    this.validationMessage = this.validationMessages;
  }

  public ngOnInit() {
    this.initializeForm();
    this.getUserDetails();
  }
  public getUserDetails() {
    const {
      firstName,
      surname,
      username,
    } = this.storageService.getCurrentUser().user;
    this.updateUserForm.patchValue({
      firstName,
      surname,
      username,
    }); // TODO:
  }
  public initializeForm() {
    this.updateUserForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
    });
  }

  public updateUser(value) {
    this.isUpdating = true;
    console.log(value);

    this.profileMgt.updateProfile(value).subscribe((resp) => {
      this.isUpdating = false;
      this.alertService.success('Profile Updated Sucessfully');
      this.updateLocalStorage(value);
    }, (error) => {
      console.log(error);
      this.isUpdating = false;
      this.alertService.error(error);
    });
}

public updateLocalStorage(val) {
  console.log(val);

  const userDet = this.storageService.getCurrentUser();
  userDet.user.firstName = val.firstName;
  userDet.user.surname = val.surname;
  userDet.user.username = val.username;
  this.storageService.storeCurrentUser(userDet);
  this.getUserDetails();
  this.sharedService.updateUserData();
}
}
