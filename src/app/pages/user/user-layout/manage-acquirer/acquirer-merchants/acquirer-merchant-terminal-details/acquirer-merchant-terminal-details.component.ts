import { ErrorHandler } from './../../../../../shared/services/error-handler.service';
import { IMerchant } from './../../../../../shared/interfaces/merchants.model';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ITerminal } from './../../../../../shared/interfaces/terminals.model';
import { TerminalsService } from './../../../../../shared/services/terminals.service';
import { AlertService } from './../../../../../../core/alert/alert.service';
// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';
import { StorageService } from 'src/app/core/helpers/storage.service';
@Component({
  selector: 'app-acquirer-merchant-terminal-details',
  templateUrl: './acquirer-merchant-terminal-details.component.html',
  styleUrls: ['./acquirer-merchant-terminal-details.component.scss'],
})
export class AcquirerMerchantTerminalDetailsComponent implements OnInit {
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
  ptspsList: any;
  permissions: any;
  acquirerId: any;
  merchantId: any;

  constructor(
    private formBuilder: FormBuilder,
    private alerts: AlertService,
    private terminals: TerminalsService,
    private router: Router,
    private route: ActivatedRoute,
    private merchants: MerchantsService,
    private errorHandler: ErrorHandler,
    private acquirerService: AcquirerService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
    this.showFilter = false;
    this.isCSVLoading = false;
    this.initializeForm();
  }

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
  }

  getTerminalDetails() {
    this.terminals
      .adminGetTerminalForMerchant(
        this.terminalId,
        this.merchantId,
        this.acquirerId
      )
      .subscribe(
        (data) => {
          this.terminalDetails = data;
          console.log('HERE IS TERMINAL DETIALS', this.terminalDetails);

          this.getAllMerchants();
        },
        (error) => {
          this.errorHandler.customClientErrors(
            'Failed to get terminal details',
            error.error.error.code,
            error.error.error.responseMessage
          );
        }
      );
  }

  getAllMerchants() {
    this.merchants.getMerchantList().subscribe(
      (data) => {
        this.allMerchants = data;
        this.updateTerminalDetailsForm();
      },
      (error) => {
        this.errorHandler.customClientErrors(
          'Failed to get merchants details',
          error.error.error.code,
          error.error.error.responseMessage
        );
      }
    );
  }
  updateTerminalDetailsForm() {
    const merchant = this.allMerchants.find((term) => {
      return term.merchantId.toString() === this.terminalDetails.merchantId;
    });

    if (merchant) {
      this.updateTerminalForm.patchValue({
        merchantId: merchant.merchantId,
        transactionTimeout: this.terminalDetails.transactionTimeout,
        callHomeTime: this.terminalDetails.callHomeTime,
        ptspId: this.terminalDetails.ptspId,
        isActive: this.terminalDetails.isActive,
      });
    }
  }

  closeModal(id: string) {
    document.getElementById(id).click();
  }

  updateTerminalDetails() {
    const merchant = this.allMerchants.find((term) => {
      return (
        term.merchantId.toString() === this.updateTerminalForm.value.merchantId
      );
    });

    this.terminalDetails.merchantId = merchant.merchantId.toString();
    // this.terminalDetails.merchantCategoryCode = merchant.merchantCategoryCode;
    // this.terminalDetails.merchantKey = merchant.merchantKey;
    // this.terminalDetails.merchantLocationNameAddress =
    //   merchant.merchantLocationNameAddress;
    // this.terminalDetails.merchantToken = merchant.merchantToken;
    // this.terminalDetails.merchantName = merchant.merchantName;

    // this.terminalDetails.terminalId = this.updateTerminalForm.value.terminalId;
    this.terminalDetails.transactionTimeout = this.updateTerminalForm.value.transactionTimeout;
    this.terminalDetails.callHomeTime = this.updateTerminalForm.value.callHomeTime;
    this.terminalDetails.ptspId = +this.updateTerminalForm.value.ptspId;
    console.log('LOVE IS HERE', this.updateTerminalForm.value.ptspId);

    this.terminalDetails.isActive = this.updateTerminalForm.value.isActive;

    console.log('TERMINAL DETIALS', this.terminalDetails);

    // const activateTerminal = (<HTMLInputElement>(
    //   document.getElementById('activateTerminal')
    // )).checked;
    // const deactivateTerminal = (<HTMLInputElement>(
    //   document.getElementById('deactivateTerminal')
    // )).checked;

    this.isUpdating = true;
    this.terminals
      .adminUpdateTerminal(
        this.terminalDetails,
        this.terminalId,
        this.acquirerId
      )
      .subscribe(
        (data) => {
          this.terminalDetails = data;
          this.isUpdating = false;
          this.closeModal('cancel_button_update_terminal');
          console.log('Update successful');
          this.alerts.success(
            `Terminal ${this.terminalId} updated successfully!`
          );
          this.getTerminalDetails();
        },
        (error) => {
          this.isUpdating = false;
          console.error(error);
          this.alertService.error(error);
        }
      );
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.terminalId = params.terminalId;
      this.merchantId = params['merchantId'];
      this.acquirerId = params['acquirerId'];
      this.getTerminalDetails();
      this.getPtspsList();

      this.getPermissions();
    });
  }
  getPtspsList() {
    this.acquirerService.adminGetAcquirerPtspsList(this.acquirerId).subscribe(
      (response) => {
        this.ptspsList = response['data']['content'];
        console.log(this.ptspsList);
      },
      (error) => {
        this.alertService.error(error);
      }
    );
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
      callHomeTime: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      transactionTimeout: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      ptspId: ['', Validators.required],
      isActive: ['', Validators.required],
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
