import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-acquirer',
  templateUrl: './acquirer.component.html',
  styleUrls: ['./acquirer.component.scss'],
})
export class AcquirerComponent implements OnInit {
  createAcquirerForm: FormGroup;

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
    this.createAcquirerForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }
}
