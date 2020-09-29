import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss'],
})
export class StationsComponent implements OnInit {
  createStationForm: FormGroup;
  isUserCreating;
  showFilter: boolean;
  expression: boolean;
  isCSVLoading;
  boolean;

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.showFilter = false;
    this.expression = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;

    this.initializeForm();
  }

  ngOnInit() {}

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      stationName: '',
      stationAcquirer: '',
      stationId: '',
    });
    this.createStationForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }

  reset() {}
  generateCSV() {}

  createUser(value) {}
}
