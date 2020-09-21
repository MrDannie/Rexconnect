import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.scss'],
})
export class TerminalsComponent implements OnInit {
  showFilter: boolean;
  createTerminalForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.showFilter = false;
    this.initializeForm();
  }

  ngOnInit() {}

  reset() {}

  generateCSV() {}

  initializeForm() {
    // this.searchForm = this.formBuilder.group({
    //   firstname: "",
    //   lastname: "",
    //   role: "",
    // });
    this.createTerminalForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }
}
