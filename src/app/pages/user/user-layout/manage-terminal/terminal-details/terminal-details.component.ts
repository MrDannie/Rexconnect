import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-terminal-details',
  templateUrl: './terminal-details.component.html',
  styleUrls: ['./terminal-details.component.scss'],
})
export class TerminalDetailsComponent implements OnInit {
  showFilter: boolean;
  expression: boolean;
  isCSVLoading;
  boolean;

  searchForm: FormGroup;
  createMerchantForm: FormGroup;
  ngForArray: number[];

  constructor(private formBuilder: FormBuilder) {
    this.showFilter = false;
    this.expression = false;
    this.isCSVLoading = false;
    this.initializeForm();
    this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngOnInit() {}

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      transactionType: '',
      terminalId: '',
      rrn: '',
      approvalDate: '',
      lastUpdateDate: '',
    });
    this.createMerchantForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }

  reset() {}
  generateCSV() {}

  createUser(value) {}
}
