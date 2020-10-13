import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-acquirer',
  templateUrl: './acquirer.component.html',
  styleUrls: ['./acquirer.component.scss'],
})
export class AcquirerComponent implements OnInit {
  createAcquirerForm: FormGroup;
  showFilter: boolean;
  isCSVLoading: boolean;
  isUserCreating: boolean;
  searchForm: FormGroup;
  ngForArray: any;

  constructor(private formBuilder: FormBuilder) {
    this.showFilter = false;
    this.showFilter = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;

    this.initializeForm();
  }

  ngOnInit() {
    this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      acquirerName: '',
      cbnCode: '',
    });
    this.createAcquirerForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }

  reset() {}
}
