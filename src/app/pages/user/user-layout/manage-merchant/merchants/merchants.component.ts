import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss'],
})
export class MerchantsComponent implements OnInit {
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
    this.ngForArray = [1,2,3,4,5,6,7,8,9,10]
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
