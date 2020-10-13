import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-acquirer-route-details',
  templateUrl: './acquirer-route-details.component.html',
  styleUrls: ['./acquirer-route-details.component.scss'],
})
export class AcquirerRouteDetailsComponent implements OnInit {
  createStationForm: FormGroup;
  isUserCreating;
  showFilter: boolean;
  expression: boolean;
  isCSVLoading;
  boolean;

  searchForm: FormGroup;
  ngForArray: number[];
  editAcquirerForm: FormGroup;

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
      stationName: '',
      stationAcquirer: '',
      stationId: '',
    });
    this.editAcquirerForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }

  reset() {}
  generateCSV() {}

  createUser(value) {}
}
