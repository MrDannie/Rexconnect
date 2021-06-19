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
import { PtspsService } from '../../ptsp-managements/ptsps.service';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { ProfileManagementService } from 'src/app/pages/shared/services/profile-management.service';

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
  // allTerminals: any;
  ptspsList: any;
  isFiltering: boolean;
  autoMidState: any;
  autoTidState: any;
  terminalRecordsToDownload: any;
  permissions: any;
  acquirerId: any;
  status: any;
  terminalIdToFilter: any;
  userSettings: any;

  constructor(
    private formBuilder: FormBuilder,
    private terminals: TerminalsService,
    private paginationService: PaginationService,
    private merchants: MerchantsService,
    private alerts: AlertService,
    private errorHandler: ErrorHandler,
    public validationMessages: ValidationService,
    private fileGenerationService: FileGenerationService,
    private acquirerService: AcquirerService,
    private storageService: StorageService,
    private routingCompService: RouteComponentService,
    private alertService: AlertService,
    private profileMgt: ProfileManagementService
  ) {
    this.messages = this.validationMessages;
  }

  getTerminals(terminalId?, status?) {
    this.isLoading = true;
    this.terminals
      .getAllTerminals(this.pageIndex, this.pageSize, terminalId, status)
      .subscribe(
        (data) => {
          this.terminalsWrapper = data;
          this.allTerminals = data.content;
          this.dataCount = data.totalElements;
          this.isLoaded = true;
          this.isLoading = false;
          this.showFilter = false;

          this.paginationService.pagerState.next({
            totalElements: this.dataCount,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          });
        },
        (e) => {
          this.isLoaded = true;
          this.isLoading = false;
          this.alerts.error(e);
          this.paginationService.pagerState.next(null);
        }
      );
  }

  getUserSettings() {
    this.profileMgt.getUserSettings().subscribe(
      (response) => {
        console.log(response);
        this.userSettings = response;
      },
      (error) => {
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
    this.acquirerId = this.storageService.getCurrentUser().user.clientId;
  }

  requestPageSize(value: number) {
    this.pageSize = value;
    this.getTerminals();
  }

  onRefreshData(payload: { pageIndex: number; pageSize: number }) {
    this.pageIndex = payload.pageIndex;
    this.pageSize = payload.pageSize;

    this.getTerminals(this.terminalIdToFilter, this.status);
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      terminalId: [''],
      status: [''],
    });
    this.createTerminalForm = this.formBuilder.group({
      merchantName: ['', Validators.compose([Validators.required])],
      terminalId: [
        '',
        Validators.compose([Validators.maxLength(8), Validators.minLength(8)]),
      ],
      transactionTimeOut: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      callHomeTime: [
        '',
        Validators.compose([Validators.required, Validators.minLength(2)]),
      ],
      ptspId: ['', Validators.compose([Validators.required])],
    });
  }

  beginDownload() {
    this.exportTerminals();
  }

  exportTerminals() {
    const temp: any[] = [];
    this.isCSVLoading = true;

    const downloadPageSize = this.dataCount;

    this.pageIndex = 0;
    this.terminals
      .getAllTerminals(
        0,
        downloadPageSize,
        this.searchForm.value.terminalId,
        this.searchForm.value.status
      )
      .subscribe(
        (data: any) => {
          this.terminalRecordsToDownload = data['content'];
          for (
            let idx = 0;
            idx < this.terminalRecordsToDownload.length;
            idx++
          ) {
            temp.push([]);
            temp[idx]['Terminal ID'] = this.clean('terminalId', idx);
            temp[idx]['Merchant ID'] = this.clean('merchantId', idx);
            temp[idx]['Transaction Timeout'] = this.clean(
              'transactionTimeout',
              idx
            );
            temp[idx]['Status'] = this.terminalRecordsToDownload[idx][
              'isActive'
            ]
              ? 'Active'
              : 'Inactive';
          }
          // this.allTerminals = temp;
          this.exportRecords(temp);
        },
        (error) => {
          this.alerts.error(error);
        }
      );
  }

  exportRecords(temp) {
    const headers = [
      'Terminal ID',
      'Merchant ID',
      'Transaction Timeout',
      'Status',
    ];
    this.fileGenerationService.generateCSV(temp, headers, 'Terminals');
    this.fileGenerationService.onDownloadCompleted.next(true);
    this.isCSVLoading = false;
  }

  clean(key: string, index: number) {
    return this.terminalRecordsToDownload[index][key]
      ? this.terminalRecordsToDownload[index][key]
      : '';
  }

  getMerchantId(name: string) {
    return 'x';
  }

  addTerminal() {
    console.log('HERE IS FORM VALUE', this.createTerminalForm.value);

    const addTerminal: IAddTerminal = {
      callHomeTime: this.createTerminalForm.value.callHomeTime,
      transactionTimeout: this.createTerminalForm.value.transactionTimeOut,
      merchantId: this.createTerminalForm.value.merchantName,
      terminalId: this.createTerminalForm.value.terminalId,
      ptspId: parseInt(this.createTerminalForm.value.ptspId, 10),
    };

    console.log('HERE IS FORM VALUE', addTerminal);

    this.isAddingTerminal = true;
    this.terminals.addNewTerminal(addTerminal).subscribe(
      (data) => {
        this.isAddingTerminal = false;
        this.closeModal('cancel_button_add_terminal');
        this.createTerminalForm.reset();
        this.getTerminals();
        this.alerts.success('Terminal Created Successfully');
      },
      (e) => {
        this.isAddingTerminal = false;
        this.alerts.error(e);
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
          if (response['message'].includes('Terminals Uploaded Successfully')) {
            this.closeModal('cancel_button_upload_file');
            this.alerts.success(response['message'], true);
            this.isUploading = false;
          } else if (event instanceof HttpResponse) {
            this.isUploading = false;
          }
        },
        (e) => {
          this.isUploading = false;
          this.alerts.error(e);
        }
      );
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

  // getPtspsList() {
  //   this.acquirerService.getAcquirerPtspsList().subscribe((response) => {
  //     this.ptspsList = response['data'];
  //     console.log('THIS IS PTSPS LIST', response);
  //   });
  // }

  getPtspsList() {
    this.acquirerService.getAcquirerPtspsList().subscribe(
      (response) => {
        this.ptspsList = response['data'];
        console.log('HERE YOU GO', this.ptspsList);
      },
      (error) => {
        this.alerts.error(error);
      }
    );
  }

  searchBy(value) {
    console.log('asdfasdf', value);
    this.pageIndex = 0;

    this.isFiltering = true;
    let { terminalId, status } = value;
    if (!value.terminalId) {
      delete value.terminalId;
      terminalId = '';
    } else {
      terminalId = value.terminalId;
    }
    if (!value.status) {
      delete value.status;
      status = '';
    } else {
      status = value.status;
    }

    this.status = status;
    this.terminalIdToFilter = terminalId;
    this.getTerminals(terminalId, status);
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

    this.getPtspsList();

    $('#createTerminal').on('hidden.bs.modal', this.resetForm.bind(this));

    this.getPermissions();

    this.getUserSettings();
  }

  resetForm() {
    this.createTerminalForm.reset();
  }

  // downloadAcquirerPtsp() {
  //   this.isCSVLoading = true;
  //   const downloadPageSize = this.dataCount;

  //   this.routingCompService
  //     .getAcquirerPtsps(0, 1000, this.acquirerId)
  //     .subscribe(
  //       (res) => {
  //         console.log('LOVE IS HERR', res);
  //         const exportData = JSON.parse(
  //           JSON.stringify(
  //             // this.allPtsps,
  //             res['data']['content'],
  //             ['Ptspname', 'PtspCode'],
  //             2
  //           )
  //         );
  //         console.log(exportData);
  //         const options = {
  //           headers: ['Name', 'PTSP CODE'],
  //           decimalseparator: '.',
  //           showTitle: false,
  //           nullToEmptyString: true,
  //         };
  //         this.isCSVLoading = false;
  //         return new Angular5Csv(
  //           exportData,
  //           'Available Ptsps For This Client',
  //           options
  //         );
  //       },
  //       (err) => {
  //         this.isCSVLoading = false;
  //         this.alertService.error(err, false);
  //       }
  //     );
  // }
}
