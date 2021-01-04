import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorHandler } from '../../../shared/services/error-handler.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { ITransactions } from 'src/app/pages/shared/interfaces/Transactions';
import { TransactionsService } from 'src/app/pages/shared/services/transactions.service';
import { FileGenerationService } from 'src/app/pages/shared/services/file-generation.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnInit {
  isUserCreating;
  showFilter: boolean;
  expression: boolean;
  isCSVLoading;
  boolean;
  searchForm: FormGroup;
  transactions: ITransactions[];
  dataCount: number;
  isLoaded: boolean;
  isLoading: boolean;
  pageSize: number;
  pageIndex: number;
  isFiltering: boolean;
  transactionRecordsToDownload: any;

  constructor(
    private formBuilder: FormBuilder,
    private transactionsService: TransactionsService,
    private paginationService: PaginationService,
    private errorHandler: ErrorHandler,
    private fileGenerationService: FileGenerationService
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
  }
  getTransactions(): void {
    this.isLoading = true;
    this.transactionsService
      .getTransactions(this.pageIndex, this.pageSize)
      .subscribe(
        (response) => {
          console.log('here', response);
          this.transactions = response.content;
          this.dataCount = response.totalElements;
          this.isLoaded = true;
          this.isLoading = false;

          this.paginationService.pagerState.next({
            totalElements: this.dataCount,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          });
          console.log('Transaction Gotten Sucessfully', response);
        },
        (error) => {
          this.isLoaded = true;
          this.isLoading = false;
          this.errorHandler.customClientErrors(
            'Failed to get terminals',
            error.error.error.code,
            error.error.error.responseMessage
          );
          this.paginationService.pagerState.next(null);
        }
      );
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      transactionId: '',
      // terminalId: '',
      rrn: '',
      transactionType: '',
      startDate: '',
      endDate: '',
    });
  }

  onRefreshData(pageParams: { pageIndex: number; pageSize: number }) {
    this.pageIndex = pageParams.pageIndex;
    this.pageSize = pageParams.pageSize;

    this.getTransactions();
  }

  filterTable(filterValues) {
    console.log(filterValues);
    this.isFiltering = true;

    //Compare Start Date and End Date
    const {
      transactionId,
      rrn,
      transactionType,
      startDate,
      endDate,
    } = filterValues;
    if (
      !this.compareStartEndDate(filterValues.startDate, filterValues.endDate)
    ) {
      console.log('Start Date Is Grater than End Date');
    } else {
      this.transactionsService
        .getFilteredTransactions(
          this.pageIndex,
          this.pageSize,
          transactionId,
          rrn,
          transactionType,
          startDate,
          endDate
        )
        .subscribe(
          (response) => {
            this.isFiltering = false;
            console.log('response after the filter tra');
          },
          (error) => {
            console.log(error);
            this.isFiltering = false;
          }
        );
    }
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
    this.pageIndex = 0;

    this.transactionsService
      .getTransactions(this.pageIndex, downloadPageSize)
      .subscribe((data: any) => {
        this.transactionRecordsToDownload = data['content'];
        for (
          let index = 0;
          index < this.transactionRecordsToDownload.length;
          index++
        ) {
          dataToDownload.push([]);
          dataToDownload[index]['Date/Time'] = this.getDate(
            'creationDate',
            index
          );
          dataToDownload[index]['Transaction ID'] = this.clean('tid', index);
          dataToDownload[index]['Merchant ID'] = this.clean('mid', index);
          dataToDownload[index]['RRN'] = this.clean('mid', index);
          dataToDownload[index]['Stan'] = this.clean('stan', index);
          dataToDownload[index]['PAN/Account'] = this.clean('pan', index);
          dataToDownload[index]['Amount'] = this.clean('username', index);
          dataToDownload[index]['Currency'] = this.getCurrencyValue(index);
          dataToDownload[index]['Type'] = this.clean('type', index);
          dataToDownload[index]['Status'] = this.clean('status', index);
        }
        console.log('dataToDownload In Exxport Users', dataToDownload);
        this.exportRecords(dataToDownload);
      });
  }

  getDate(creationDate, index) {
    return new Date(this.transactionRecordsToDownload[index][creationDate]);
  }

  getCurrencyValue(index) {
    const currencyCode = this.transactionRecordsToDownload[index][
      'currencyCode'
    ];
    const currencyAlpha = this.transactionRecordsToDownload[index][
      'currencyAlpha'
    ];
    return `${currencyCode} (${currencyAlpha})`;
  }
  exportRecords(dataToDownload: any[]) {
    const headers = [
      'Date/Time',
      'Transaction ID',
      'Merchant ID',
      'RRN',
      'Stan',
      'PAN/Account',
      'Amount',
      'Currency',
      'Type',
      'Status',
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
}
