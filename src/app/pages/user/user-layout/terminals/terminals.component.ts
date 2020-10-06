import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.scss'],
})
export class TerminalsComponent implements OnInit {
  showFilter: boolean;
  searchForm: FormGroup;
  createTerminalForm: FormGroup;
  isCSVLoading: boolean;
  isUserCreating: boolean;
  ngForArray: Array<number>

  constructor(private formBuilder: FormBuilder) {
    this.showFilter = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;
    this.initializeForm();
    this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
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
