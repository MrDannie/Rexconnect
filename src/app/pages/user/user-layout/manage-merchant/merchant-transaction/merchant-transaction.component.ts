import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchant-transaction',
  templateUrl: './merchant-transaction.component.html',
  styleUrls: ['./merchant-transaction.component.scss'],
})
export class MerchantTransactionComponent implements OnInit {
  showFilter: boolean;
  expression: boolean;
  isCSVLoading;
  boolean;

  ngForArray: number[];
  editAcquirerForm: any;

  constructor(private formBuilder: FormBuilder) {
    this.showFilter = false;
    this.expression = false;
    this.isCSVLoading = false;
    this.initializeForm();
    this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  ngOnInit() {}

  initializeForm() {
    this.editAcquirerForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }

  reset() {}
  generateCSV() {}

  createUser(value) {}
}
