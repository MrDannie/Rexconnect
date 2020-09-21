import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss'],
})
export class StationsComponent implements OnInit {
  createStationForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initializeForm();
  }
  ngOnInit() {}

  initializeForm() {
    // this.searchForm = this.formBuilder.group({
    //   firstname: "",
    //   lastname: "",
    //   role: "",
    // });
    this.createStationForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }
}
