import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorHandler } from '../../../shared/services/error-handler.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { ITransactions } from 'src/app/pages/shared/interfaces/Transactions';
import { TransactionsService } from 'src/app/pages/shared/services/transactions.service';
import { isNullOrUndefined } from 'util';
import { error } from 'protractor';

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

  constructor(
    private formBuilder: FormBuilder,
    private transactionsService: TransactionsService,
    private paginationService: PaginationService,
    private errorHandler: ErrorHandler
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
}
