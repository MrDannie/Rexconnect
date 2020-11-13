// tslint:disable
import { FileGenerationService } from './../../../../shared/services/file-generation.service';
import { IWrapper } from './../../../../shared/interfaces/wrapper.model';
import { ValidationService } from './../../../../../core/validation.service';
import { ErrorHandler } from './../../../../shared/services/error-handler.service';
import { IMerchant } from './../../../../shared/interfaces/merchants.model';
import { AlertService } from './../../../../../core/alert/alert.service';
import { PaginationService } from './../../../../../core/pagination.service';
import {
  ITerminal,
  IAddTerminal,
} from './../../../../shared/interfaces/terminals.model';
import { TerminalsService } from './../../../../shared/services/terminals.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantsService } from './../../../../shared/services/merchants.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

declare var $: any;

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.scss'],
})
export class TerminalsComponent implements OnInit {
  showFilter: boolean;
  searchForm: FormGroup;
  createTerminalForm: FormGroup;
  isCSVLoading: boolean;
  isUserCreating: boolean;

  terminalsWrapper: IWrapper<ITerminal>;
  allTerminals: ITerminal[] = [];
  allMerchants: IMerchant[] = [];

  pageIndex: number;
  pageSize: number;
  dataCount: number;
  isLoaded = false;

  // filter params
  terminalId = '';

  onAddTerminal: boolean;
  isAddingTerminal: boolean;
  selectedFile: File;
  percentDone: number;
  isUploading: boolean;
  isLoading: boolean;

  messages: any;
  exportTerminalsRecords: any;

  constructor(
    private formBuilder: FormBuilder,
    private terminals: TerminalsService,
    private paginationService: PaginationService,
    private merchants: MerchantsService,
    private alerts: AlertService,
    private errorHandler: ErrorHandler,
    public validationMessages: ValidationService,
    private fileGenerationService: FileGenerationService
  ) {
    this.messages = this.validationMessages;
  }

  getTerminals() {
    this.isLoading = true;
    this.terminals.getAllTerminals(this.pageIndex, this.pageSize, this.terminalId).subscribe(
      data => {
        this.terminalsWrapper = data;
        this.allTerminals = data.content;
        this.dataCount = data.totalElements;
        this.isLoaded = true;
        this.isLoading = false;

        this.paginationService.pagerState.next({
          totalElements: this.dataCount,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        });
      },
      e => {
        this.isLoaded = true;
        this.isLoading = false;
        this.errorHandler.customClientErrors('Failed to get terminals', e.error.error.code, e.error.error.responseMessage);
        this.paginationService.pagerState.next(null);
      }
    );
  }

  requestPageSize(value: number) {
    this.pageSize = value;
    this.getTerminals();
  }

  onRefreshData(payload: { pageIndex: number; pageSize: number }) {
    this.pageIndex = payload.pageIndex;
    this.pageSize = payload.pageSize;

    this.getTerminals();
  }

  reset() {}

  generateCSV() {}

  createUser(value) {}

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      terminalId: [''],
    });
    this.createTerminalForm = this.formBuilder.group({
      merchantName: ['', Validators.compose([Validators.required])],
      terminalId: [
        '',
        Validators.compose([
          Validators.required,
          Validators.maxLength(8),
          Validators.minLength(8),
        ]),
      ],
      transactionTimeOut: ['', Validators.compose([Validators.required])],
      callHomeTime: ['', Validators.compose([Validators.required])],
    });
  }

  beginDownload() {
    this.exportTerminals();
  }

  exportTerminals() {
    const temp: any[] = [];
    const pageSize = this.pageSize;

    this.pageSize = this.terminalsWrapper.totalElements;
    this.pageIndex = 0;

    this.terminals.getAllTerminals(this.pageIndex, this.pageSize, this.terminalId).subscribe(
      (data: any) => {
        this.exportTerminalsRecords = data.content;
        this.pageSize = pageSize;
        for (let idx = 0; idx < this.exportTerminalsRecords.length; idx++) {
          temp.push([]);
          temp[idx]['Terminal ID'] = this.clean('terminalId', idx);
          temp[idx]['Merchant ID'] = this.clean('merchantId', idx);
          temp[idx]['Transaction Timeout'] = this.clean('transactionTimeout', idx);
        }
        this.exportTerminalsRecords = temp;
        this.exportRecords();

      },
      error => {
        this.fileGenerationService.onDownloadCompleted.next(false);
        this.alerts.error('Terminals download could not be completed');
      }
    );

  }
  exportRecords() {
    const headers = ['Terminal ID', 'Merchant ID', 'Transaction Timeout'];
    this.fileGenerationService.generateCSV(this.exportTerminalsRecords, headers, 'Terminals');
    this.fileGenerationService.onDownloadCompleted.next(true);
  }

  clean(key: string, index: number) {
    return this.exportTerminalsRecords[index][key] ? this.exportTerminalsRecords[index][key] : '';
  }

  getMerchantId(name: string) {
    return 'x';
  }

  addTerminal() {
    const addTerminal: IAddTerminal = {
      callHomeTime: this.createTerminalForm.value.callHomeTime,
      transactionTimeout: this.createTerminalForm.value.transactionTimeOut,
      merchantId: this.createTerminalForm.value.merchantName,
      terminalId: this.createTerminalForm.value.terminalId,
    };

    this.isAddingTerminal = true;
    this.terminals.addNewTerminal(addTerminal).subscribe(
      (data) => {
        this.isAddingTerminal = false;
        this.closeModal('cancel_button_add_terminal');
        this.createTerminalForm.reset();
        this.getTerminals();
        this.alerts.success('Terminal Created Successfully');
      },
      e => {
        this.errorHandler.customClientErrors('Failed to create terminal', e.error.error.code, e.error.error.responseMessage);
      }
    );
  }

  uploadFile() {
    const fileInput = document.createElement('input') as HTMLInputElement;
    fileInput.setAttribute('type', 'file');
    fileInput.addEventListener('change', (evt) => {
      this.selectedFile = (evt.target as HTMLInputElement).files[0];
    });

    fileInput.click();
  }

  uploadTerminals() {
    this.isUploading = true;
    const formData = new FormData();
    if (this.selectedFile != null) {
      formData.append('file', this.selectedFile);
      this.terminals.uploadTerminals(formData).subscribe(
        (response) => {
          if (response['type'] === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * response['loaded'] / response['total']);
          } else if (event instanceof HttpResponse) {
            this.isUploading = false;
            this.alerts.success('File uploaded successfully!');
          }
          this.closeModal('cancel_button_upload_file');
        },
        (e) => {
          this.isUploading = false;
          this.errorHandler.customClientErrors('Failed to upload file', e.error.error.code, e.error.error.responseMessage);

      });
    }
  }

  closeModal(id: string) {
    document.getElementById(id).click();
  }

  getAllMerchants() {
    this.merchants.getMerchantList().subscribe(
      (data) => {
        this.allMerchants = data;
      },
      (error) => {
        this.alerts.warn('Error occurred while getting merchants data');
      }
    );
  }

  searchBy() {
    const terminalId = this.searchForm.value.terminalId || '';
    this.terminalId = terminalId;
    this.showFilter = false;

    this.getTerminals();
  }

  clearFilters() {
    this.showFilter = false;
    this.terminalId = '';
    this.searchForm.reset();

    this.pageIndex = 0;
    this.pageSize = 10;

    this.getTerminals();
  }

  ngOnInit() {
    this.showFilter = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;

    this.pageSize = 10;
    this.pageIndex = 0;

    this.initializeForm();
    this.getTerminals();
    this.getAllMerchants();

    $('#createTerminal').on('hidden.bs.modal', this.resetForm.bind(this));
  }

  resetForm() {
    this.createTerminalForm.reset();
  }
}
