import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { ValidationService } from 'src/app/core/validation.service';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss'],
})
export class PersonalDetailsComponent implements OnInit {
  updateUserForm: FormGroup;
  validationMessage: any;
  isUserCreating: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private validationMessages: ValidationService,
    private storageService: StorageService
  ) {
    this.validationMessage = this.validationMessages;
  }

  ngOnInit() {
    this.initializeForm();
    this.getUserDetails();
    this.isUserCreating = false;
  }
  getUserDetails() {
    const {
      clientId,
      firstName,
      surname,
      phone,
    } = this.storageService.getCurrentUser().user;
    this.updateUserForm.patchValue({
      clientId,
      firstName,
      lastname: surname,
      phone,
    }); //TODO:
  }
  initializeForm() {
    this.updateUserForm = this.formBuilder.group({
      clientId: [''],
      firstName: ['', Validators.compose([Validators.required])],
      lastname: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
    });
  }

  updateUser(formValues) {}
}
