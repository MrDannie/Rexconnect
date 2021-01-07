import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ptsp',
  templateUrl: './ptsp.component.html',
  styleUrls: ['./ptsp.component.scss']
})
export class PtspComponent implements OnInit {
  showFilter: boolean;
  expression: boolean;
  isCSVLoading;
  boolean;

  searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.showFilter = false;
    this.expression = false;
    this.isCSVLoading = false;
    this.initializeForm();
  }

  ngOnInit() { }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      emailAddress: '',
      ipAddress: '',
      actionPerformed: '',
      startDate: '',
      endDate: '',
    });
  }

  reset() { }
  generateCSV() { }

  createUser(value) { }
}
