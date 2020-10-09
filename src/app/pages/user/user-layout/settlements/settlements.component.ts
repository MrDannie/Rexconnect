import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.scss'],
})
export class SettlementsComponent implements OnInit {
  isUserCreating;
  showFilter: boolean;
  expression: boolean;
  isCSVLoading;
  boolean;

  searchForm: FormGroup;
  ngForArray: number[];

  constructor(private formBuilder: FormBuilder) {
    this.showFilter = false;
    this.expression = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;
    this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    this.initializeForm();
  }

  ngOnInit() {}

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      transactionId: '',
      terminalId: '',
      settlementStartDate: '',
      settlementEndDate: '',
    });
  }

  generateCSV() {}

  reset() {}
}
