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
      merchantId: '',
      terminalId: '',
    });
    this.createTerminalForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }
}
