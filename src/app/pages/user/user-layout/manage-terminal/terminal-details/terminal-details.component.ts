import { IMerchant } from './../../../../shared/interfaces/merchants.model';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
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
  isCSVLoading;
  boolean;

  searchForm: FormGroup;
  createMerchantForm: FormGroup;
  ngForArray: number[];

  allMerchants: IMerchant[];
  updateTerminalForm: FormGroup;

  terminalDetails: ITerminal;
  terminalId: string;
  isUpdating: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private alerts: AlertService,
    private terminals: TerminalsService,
    private router: Router,
    private route: ActivatedRoute,
    private merchants: MerchantsService
  ) {
    this.showFilter = false;
    this.isCSVLoading = false;
    this.initializeForm();
    this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  getTerminalDetails() {
    this.terminals.getTerminal(this.terminalId).subscribe(
      data => {
        this.terminalDetails = data;
        this.getAllMerchants();
      },
      error => {
        this.alerts.warn('Error Occurred while getting terminal details');
      }
    )
  }

  getAllMerchants() {
    this.merchants.getMerchantList().subscribe(
      data => {
        this.allMerchants = data;
        this.updateTerminalDetailsForm();
        this.alerts.success('Merchants don land');
      },
      error => {
        this.alerts.warn('Error occurred while getting merchants data');
      }
    );
  }
  updateTerminalDetailsForm() {
    const merchant = this.allMerchants.find(term => {
      return term.merchantId.toString() === this.terminalDetails.merchantId
    })

    if (merchant) {
      this.updateTerminalForm.patchValue({
        merchantId: merchant.merchantId,
        terminalId: this.terminalId,
        transactionTimeout: this.terminalDetails.transactionTimeout,
        callHomeTime: this.terminalDetails.callHomeTime
      })
    }
  }

  closeModal(id: string) {
    document.getElementById(id).click();
  }

  updateTerminalDetails() {

    const merchant = this.allMerchants.find(term => {
      return term.merchantId.toString() === this.updateTerminalForm.value.merchantId
    })

    this.terminalDetails.merchantId = merchant.merchantId.toString();
    this.terminalDetails.merchantCategoryCode = merchant.merchantCategoryCode;
    this.terminalDetails.merchantKey = merchant.merchantKey;
    this.terminalDetails.merchantLocationNameAddress = merchant.merchantLocationNameAddress;
    this.terminalDetails.merchantToken = merchant.merchantToken;
    this.terminalDetails.merchantName = merchant.merchantName;

    this.terminalDetails.terminalId = this.updateTerminalForm.value.terminalId;
    this.terminalDetails.transactionTimeout = this.updateTerminalForm.value.transactionTimeout;
    this.terminalDetails.callHomeTime = this.updateTerminalForm.value.callHomeTime;

    const activateTerminal = (<HTMLInputElement>document.getElementById('activateTerminal')).checked;
    const deactivateTerminal = (<HTMLInputElement>document.getElementById('deactivateTerminal')).checked;

    this.isUpdating = true;
    this.terminals.updateTerminal(this.terminalDetails, this.terminalId)
      .subscribe(
        data => {
          this.terminalDetails = data;
          this.isUpdating = false;
          this.closeModal('cancel_button_update_terminal');
          console.log('Update successful');
          this.alerts.success(`Terminal ${ this.terminalId } updated successfully!`);
          this.getTerminalDetails();
        },
        error => {
          this.isUpdating = false;
          console.error(error);
          this.alerts.warn('Error occurred while updating terminal');
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

    this.updateTerminalForm = this.formBuilder.group({
      merchantId: ['', Validators.required],
      terminalId: ['', Validators.required],
      callHomeTime: ['', Validators.required],
      transactionTimeout: ['', Validators.required]
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
