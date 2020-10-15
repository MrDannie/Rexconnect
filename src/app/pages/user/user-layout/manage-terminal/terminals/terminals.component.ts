import { IMerchant } from './../../../../shared/interfaces/merchants.model';
import { AlertService } from './../../../../../core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { ITerminal, IAddTerminal } from './../../../../shared/interfaces/terminals.model';
import { TerminalsService } from './../../../../shared/services/terminals.service';
// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

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

  allTerminals: ITerminal[];
  allMerchants: IMerchant[];

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

  constructor(
    private formBuilder: FormBuilder,
    private terminals: TerminalsService,
    private paginationService: PaginationService,
    private merchants: MerchantsService,
    private alerts: AlertService
  ) { }

  getTerminals() {
    // this.isLoaded = false;
    this.terminals.getAllTerminals(this.pageIndex, this.pageSize, this.terminalId).subscribe(
      data => {
        this.allTerminals = data.content;
        this.dataCount = data.totalElements;
        this.isLoaded = true;

        this.paginationService.changePagerState.next(true);
      },
      error => {
        this.isLoaded = true;
        this.paginationService.changePagerState.next(false);
      }
    );
  }

  requestPageSize(value: number) {
    this.pageSize = value;
    this.getTerminals();
  }

  onRefreshData(payload: { pageIndex: number, pageSize: number }) {
    this.pageIndex = payload.pageIndex;
    this.pageSize = payload.pageSize;

    this.getTerminals();
  }

  reset() {}

  generateCSV() {}

  createUser(value) {}

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      terminalId: ['']
    });
    this.createTerminalForm = this.formBuilder.group({
      merchantName: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required, Validators.maxLength(8), Validators.minLength(8)])],
      transactionTimeOut: ['', Validators.compose([Validators.required])],
      callHomeTime: ['', Validators.compose([Validators.required])]
    });

  }

  getMerchantId(name: string) {
    return 'x';
  }

  addTerminal() {
    const addTerminal: IAddTerminal = {
      callHomeTime: this.createTerminalForm.value.callHomeTime,
      transactionTimeout: this.createTerminalForm.value.transactionTimeOut,
      merchantId: this.createTerminalForm.value.merchantName,
      terminalId: this.createTerminalForm.value.terminalId
    }

    this.isAddingTerminal = true;
    this.terminals.addNewTerminal(addTerminal).subscribe(
      data => {
        this.isAddingTerminal = false;
        this.closeModal('cancel_button_add_terminal');
        this.createTerminalForm.reset();
        this.getTerminals();
        this.alerts.success('Terminal Created Successfully');
      },
      error => {
        this.alerts.warn(`Error occurred while creating terminal: ${ error.error.message }`);
      }
    )

  }

  uploadFile() {
    const fileInput = document.createElement('input') as HTMLInputElement;
    fileInput.setAttribute('type', 'file');
    fileInput.addEventListener('change', (evt) => {
      this.selectedFile = (evt.target as HTMLInputElement).files[0];
    })

    fileInput.click();
  }

  uploadTerminals() {
    this.isUploading = true;
    const formData = new FormData();
    if (this.selectedFile != null) {
      formData.append('file', this.selectedFile);
      this.terminals.uploadTerminals(formData).subscribe(
        (response) => {
          console.log(response);
          if (response['type'] === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(100 * response['loaded'] / response['total']);
            console.log(`File is ${this.percentDone}% uploaded.`);
          } else if (event instanceof HttpResponse) {
            this.isUploading = false;
            this.alerts.success('File uploaded successfully!');
            console.log('File is completely uploaded!');
          }
          this.closeModal('cancel_button_upload_file');
        },
        (error) => {
          this.isUploading = false;
          console.error(error);
          this.alerts.warn('Error occurred while uploading file');
      });
    }
  }

  closeModal(id: string) {
    document.getElementById(id).click();
  }

  getAllMerchants() {
    this.merchants.getMerchantList().subscribe(
      data => {
        this.allMerchants = data;
        this.alerts.success('Merchants don land');
      },
      error => {
        this.alerts.warn('Error occurred while getting merchants data');
      }
    );
  }

  searchBy() {
    const terminalId = this.searchForm.value.terminalId || '';
    this.terminalId = terminalId;
    this.showFilter = false;

    // this.pageIndex = 0;

    this.getTerminals();
  }

  clearFilters() {
    this.showFilter = false;
    this.terminalId = '';
    this.searchForm.reset();

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
  }

}
