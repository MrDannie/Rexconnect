import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorHandler } from '../../../shared/services/error-handler.service';
import { PaginationService } from 'src/app/core/pagination.service';
import {
  ITransactions,
  SearchTransactions,
} from 'src/app/pages/shared/interfaces/Transactions';
import { TransactionsService } from 'src/app/pages/shared/services/transactions.service';
import { FileGenerationService } from 'src/app/pages/shared/services/file-generation.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { DatePipe } from '@angular/common';
import { MaskSensitiveKeys } from 'src/app/pages/shared/pipes/mask-sensitve-key.pipe';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
  providers: [DatePipe, MaskSensitiveKeys],
})
export class TransactionsComponent implements OnInit {
  isUserCreating;
  showFilter: boolean;
  expression: boolean;
  isCSVLoading;
  boolean;
  searchForm: FormGroup;
  transactions: ITransactions[] = [];
  dataCount: number;
  isLoaded: boolean;
  isLoading: boolean;
  pageSize: number;
  pageIndex: number;
  isFiltering: boolean;
  transactionRecordsToDownload: any;

  startDate = new Date(Date.now() - 7 * 86400000);
  endDate = new Date();
  hasError: boolean;

  dateValues = {
    startDate: this.startDate.toISOString().substring(0, 10),
    endDate: this.endDate.toISOString().substring(0, 10),
  };
  num: number;

  constructor(
    private formBuilder: FormBuilder,
    private transactionsService: TransactionsService,
    private paginationService: PaginationService,
    private errorHandler: ErrorHandler,
    private fileGenerationService: FileGenerationService,
    private alerts: AlertService,
    private datePipe: DatePipe,
    private maskSensitiveKeys: MaskSensitiveKeys
  ) {}

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;

    this.showFilter = false;
    this.isFiltering = false;

    this.expression = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;

    this.initializeForm();
    this.getTransactions();
    this.num = 5;
  }

  clearFilters() {
    this.searchForm.reset('');

    this.pageIndex = 0;
    this.pageSize = 10;

    this.dateValues = {
      startDate: this.startDate.toISOString().substring(0, 10),
      endDate: this.endDate.toISOString().substring(0, 10),
    };

    // this.initializeForm();

    this.getTransactions();
  }

  getTransactions(): void {
    this.isLoading = true;
    this.transactionsService
      .getTransactions(
        this.pageIndex,
        this.pageSize,
        this.searchForm.value.startDate,
        this.searchForm.value.endDate,
        this.searchForm.value.terminalId,
        this.searchForm.value.merchantId,
        this.searchForm.value.rrn,
        this.searchForm.value.transactionType
      )
      .subscribe(
        (response) => {
          // response.content.map((trx) => {
          //   trx.pan = this.maskSensitiveKeys.transform(trx.pan, 3);
          // });
          this.transactions = response.content;
          this.dataCount = response.totalElements;
          this.isLoaded = true;
          this.isLoading = false;
          this.hasError = false;

          this.paginationService.pagerState.next({
            totalElements: this.dataCount,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          });
        },
        (error) => {
          this.isLoaded = true;
          this.isLoading = false;
          this.alerts.error(
            'Error occurred while getting transactions: ',
            error.error.message
          );
          this.hasError = true;
          this.paginationService.pagerState.next(null);
        }
      );
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      terminalId: [''],
      rrn: [''],
      merchantId: [''],
      transactionType: [''],
      startDate: [this.getDateString(this.startDate)],
      endDate: [this.getDateString(this.endDate)],
    });
  }

  onRefreshData(pageParams: { pageIndex: number; pageSize: number }) {
    this.pageIndex = pageParams.pageIndex;
    this.pageSize = pageParams.pageSize;

    this.getTransactions();

    // merchantId: this.searchForm.value.merchantId,
    // terminalId: this.searchForm.value.terminalId,
    // type: this.searchForm.value.transactionType,
    // referenceNumber: this.searchForm.value.rrn,
    // startDate: this.startDate.toISOString().substring(0, 10),
    // endDate: this.endDate.toISOString().substring(0, 10),
  }

  getDateString(dateObj: Date): string {
    let day, month, year, date;
    day = dateObj.getDate();
    if (day < 10) {
      day = '0' + day;
    }
    month = dateObj.getMonth() + 1;
    if (month < 10) {
      month = '0' + month;
    }
    year = dateObj.getFullYear();
    date = year + '-' + month + '-' + day;

    return date;
  }

  filterTable() {
    this.pageIndex = 0;
    this.showFilter = false;
    this.isLoading = true;

    const options: SearchTransactions = {
      merchantId: this.searchForm.value.merchantId,
      terminalId: this.searchForm.value.terminalId,
      type: this.searchForm.value.transactionType,
      referenceNumber: this.searchForm.value.rrn,
      startDate: this.startDate.toISOString().substring(0, 10),
      endDate: this.endDate.toISOString().substring(0, 10),
    };

    if (
      this.searchForm.value.startDate != null &&
      this.searchForm.value.startDate != ''
    ) {
      options.startDate = this.searchForm.value.startDate;
      this.dateValues.startDate = options.startDate;
    }

    if (
      this.searchForm.value.endDate != null &&
      this.searchForm.value.endDate != ''
    ) {
      options.endDate = this.searchForm.value.endDate;
      this.dateValues.endDate = options.endDate;
    }

    this.transactionsService
      .getFilteredTransactions(this.pageIndex, this.pageSize, options)
      .subscribe(
        (response) => {
          this.transactions = response.content;
          this.dataCount = response.totalElements;
          this.isLoaded = true;
          this.isLoading = false;
          this.hasError = false;

          this.paginationService.pagerState.next({
            totalElements: this.dataCount,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          });
        },
        (error) => {
          this.alerts.error(error);
          console.log('THIS IS ERROR', error);

          this.isFiltering = false;
          this.isLoaded = true;
          this.isLoading = false;
          this.hasError = true;
          this.paginationService.pagerState.next(null);
        }
      );
  }

  compareStartEndDate(startDate, endDate): boolean {
    console.log('dates after formatting', startDate, endDate);
    if (startDate !== null && endDate !== null) {
      if (new Date(endDate) < new Date(startDate)) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }

  requestPageSize(value: number) {
    this.pageSize = value;
    this.getTransactions();
  }

  refreshTableData() {
    this.showFilter = false;
    this.searchForm.reset();

    this.pageIndex = 0;
    this.pageSize = 10;

    this.getTransactions();
  }

  onDownloadAsCSV() {
    this.exportTransactions();
  }
  exportTransactions() {
    const dataToDownload: any[] = [];
    // const currentPageSize = this.pageSize;

    const downloadPageSize = this.dataCount;
    // this.pageIndex = 0;

    this.transactionsService
      .getTransactions(
        0,
        downloadPageSize,
        this.searchForm.value.startDate,
        this.searchForm.value.endDate,
        this.searchForm.value.terminalId,
        this.searchForm.value.merchantId,
        this.searchForm.value.rrn,
        this.searchForm.value.transactionType
      )
      .subscribe((data: any) => {
        this.transactionRecordsToDownload = data['content'];
        for (
          let index = 0;
          index < this.transactionRecordsToDownload.length;
          index++
        ) {
          dataToDownload.push([]);

          dataToDownload[index]['Transaction ID'] = this.clean(
            'transactionId',
            index
          );

          dataToDownload[index]['Terminal ID'] = this.clean('tid', index);
          dataToDownload[index]['Merchant ID'] = this.clean('mid', index);
          dataToDownload[index]['RRN'] = this.clean('rrn', index);
          dataToDownload[index]['Stan'] = this.clean('stan', index);
          dataToDownload[index]['PAN/Account'] = this.clean('pan', index);
          dataToDownload[index]['Amount'] = this.clean('amount', index);
          dataToDownload[index]['Currency'] = this.getCurrencyValue(index);
          dataToDownload[index]['Type'] = this.clean('type', index);
          dataToDownload[index]['Additional Data'] = this.cleanAdditonalData(
            'additionalData',
            index
          );
          dataToDownload[index]['Status'] = this.clean('status', index);
          dataToDownload[index]['Date/Time'] = this.getDate(
            'creationDate',
            index
          );
        }
        console.log('dataToDownload In Exxport Users', dataToDownload);
        this.exportRecords(dataToDownload);
      });
  }

  getDate(creationDate, index) {
    let date = new Date(this.transactionRecordsToDownload[index][creationDate]);
    return this.datePipe.transform(date, 'medium', 'UTC');
  }

  getCurrencyValue(index) {
    const currencyCode =
      this.transactionRecordsToDownload[index]['currencyCode'];
    const currencyAlpha =
      this.transactionRecordsToDownload[index]['currencyAlpha'];
    return `${currencyCode} (${currencyAlpha})`;
  }
  exportRecords(dataToDownload: any[]) {
    const headers = [
      'Transaction ID',
      'Terminal ID',
      'Merchant ID',
      'RRN',
      'Stan',
      'PAN/Account',
      'Amount',
      'Currency',
      'Type',
      'Additional Data',
      'Status',
      'Date/Time',
    ];
    this.fileGenerationService.generateCSV(
      dataToDownload,
      headers,
      'Transactions'
    );
    this.fileGenerationService.onDownloadCompleted.next(true);
  }

  clean(key: string, index: number) {
    return this.transactionRecordsToDownload[index][key]
      ? this.transactionRecordsToDownload[index][key]
      : '';
  }

  cleanAdditonalData(key: string, index: number) {
    // console.log(
    //   'VALUE',
    //   this.transactionRecordsToDownload[index][key]['customerPhoneNo']
    // );

    console.log('afadfasdf', key, index);

    //   console.log(
    //     'HERER',
    //     this.transactionRecordsToDownload[index]['addtionalData']
    //   );

    return this.transactionRecordsToDownload[index]['additionalData']
      ? `Phone Number: ${
          this.transactionRecordsToDownload[index]['additionalData']
            .customerPhoneNo
        }; Provider Reference: ${
          this.transactionRecordsToDownload[index]['additionalData']
            .providerReference
            ? this.transactionRecordsToDownload[index]['additionalData']
                .providerReference
            : 'NIL'
        }`
      : '';
  }
}
