import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
  showFilter: boolean;
  searchForm: FormGroup;
  createTerminalForm: FormGroup;
  isCSVLoading: boolean;
  isUserCreating: boolean;

  constructor(private formBuilder: FormBuilder) {
    this.showFilter = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;
    this.initializeForm();
  }

  ngOnInit() {}

  reset() {}

  generateCSV() {}

  createUser(value) {}

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      firstname: '',
      lastname: '',
      role: '',
    });
    this.createTerminalForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }
}
