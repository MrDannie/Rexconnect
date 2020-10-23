import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ErrorHandler } from '../../../shared/services/error-handler.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { ITransactions } from 'src/app/pages/shared/interfaces/Transactions';
import { TransactionsService } from 'src/app/pages/shared/services/transactions.service';

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
  transactions: ITransactions[] = [];
  dataCount: number;
  isLoaded: boolean;
  isLoading: boolean;
  pageSize: number;
  pageIndex: number;

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
    this.expression = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;

    this.initializeForm();
    this.getTransactions();
  }
  getTransactions(): void {
    this.transactionsService.getTransactions(1, 10).subscribe(
      (response) => {
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
      transactionID: '',
      terminalId: '',
      rrn: '',
      transactionType: '',
      startDate: '',
      endDate: '',
    });
  }

  generateCSV() {}
}
