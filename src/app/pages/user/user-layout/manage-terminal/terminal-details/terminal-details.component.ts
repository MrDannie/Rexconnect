import { Router, ActivatedRoute, Params } from '@angular/router';
import { ITerminal } from './../../../../shared/interfaces/terminals.model';
import { TerminalsService } from './../../../../shared/services/terminals.service';
import { AlertService } from './../../../../../core/alert/alert.service';
// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-terminal-details',
  templateUrl: './terminal-details.component.html',
  styleUrls: ['./terminal-details.component.scss'],
})
export class TerminalDetailsComponent implements OnInit {
  showFilter: boolean;
  expression: boolean;
  isCSVLoading;
  boolean;

  searchForm: FormGroup;
  createMerchantForm: FormGroup;
  ngForArray: number[];

  terminalDetails: ITerminal;
  terminalId: string;

  constructor(
    private formBuilder: FormBuilder,
    private alerts: AlertService,
    private terminals: TerminalsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.showFilter = false;
    this.expression = false;
    this.isCSVLoading = false;
    this.initializeForm();
    this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  getTerminalDetails() {
    this.terminals.getTerminal(this.terminalId).subscribe(
      data => {
        this.terminalDetails = data;
      },
      error => {
        this.alerts.warn('Error Occurred while getting terminal details');
      }
    )
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.terminalId = params.id;
      this.getTerminalDetails();
    })
  }


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
