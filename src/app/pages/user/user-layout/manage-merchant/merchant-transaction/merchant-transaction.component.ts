import { ErrorHandler } from './../../../../shared/services/error-handler.service';
import { AlertService } from './../../../../../core/alert/alert.service';
import { PaginationService } from './../../../../../core/pagination.service';
import { ITransaction } from './../../../../shared/interfaces/transactions.model';
import { MerchantsService } from './../../../../shared/services/merchants.service';
import { ActivatedRoute, Params } from '@angular/router';
// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-merchant-transaction',
  templateUrl: './merchant-transaction.component.html',
  styleUrls: ['./merchant-transaction.component.scss'],
})
export class MerchantTransactionComponent implements OnInit {
  showFilter: boolean;
  expression: boolean;
  isCSVLoading;

  isUserCreating;

  searchForm: FormGroup;
  merchantId: string;

  pageIndex: number;
  pageSize: number;
  dataCount: number;

  allTransactions: ITransaction[] = [];
  isLoading: boolean;
  loadPagination: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private merchants: MerchantsService,
    private paginationService: PaginationService,
    private alerts: AlertService,
    private errorHandler: ErrorHandler
  ) {
    this.showFilter = false;
    this.initializeForm();
  }

  getMerchantTransactions(merchantId: string) {
    this.isLoading = true;
    this.allTransactions = [];
    this.merchants.getMerchantTransactions(merchantId, this.pageIndex, this.pageSize)
      .subscribe(
        data => {
          this.allTransactions = data.content;
          this.dataCount = data.totalElements;
          this.isLoading = false;
          this.loadPagination = true;

          this.paginationService.pagerState.next({
            totalElements: this.dataCount,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize
          });
        },
        error => {
          console.error(error);
          this.isLoading = false;
          this.loadPagination = true;
          this.paginationService.pagerState.next(null);
          this.errorHandler.customClientErrors('Error occurred while getting this terminal\'s transactions',
          error.error.error.code,
          error.error.error.responseMessage
        );
        }
      );
  }

  onRefreshData(payload: { pageSize: number, pageIndex: number }) {
    this.pageIndex = payload.pageIndex;
    this.pageSize = payload.pageSize;

    this.getMerchantTransactions(this.merchantId);
  }

  requestPageSize(newSize: number) {
    this.pageSize = newSize;
    this.getMerchantTransactions(this.merchantId);
  }

  ngOnInit() {
    this.pageIndex = 0;
    this.pageSize = 10;
    this.route.params.subscribe((params: Params) => {
      this.merchantId = params.id;
      this.getMerchantTransactions(this.merchantId);
    })
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

}
