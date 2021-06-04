import { FileGenerationService } from './../../../../shared/services/file-generation.service';
import { IWrapper } from './../../../../shared/interfaces/wrapper.model';
import { ErrorHandler } from './../../../../shared/services/error-handler.service';
import { AlertService } from './../../../../../core/alert/alert.service';
import { PaginationService } from './../../../../../core/pagination.service';
import { ITransaction } from './../../../../shared/interfaces/transactions.model';
import { MerchantsService } from './../../../../shared/services/merchants.service';
import { ActivatedRoute, Params } from '@angular/router';
// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MaskSensitiveKeys } from 'src/app/pages/shared/pipes/mask-sensitve-key.pipe';

@Component({
  selector: 'app-acquirer-transactions',
  templateUrl: './acquirer-transactions.component.html',
  styleUrls: ['./acquirer-transactions.component.scss'],
  providers: [MaskSensitiveKeys],
})
export class AcquirerTransactionsComponent implements OnInit {
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
  transactionsWrapper: IWrapper<ITransaction>;
  isLoading: boolean;
  loadPagination: boolean;
  exportedTransactionRecords: any;
  acquirerId: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private merchants: MerchantsService,
    private paginationService: PaginationService,
    private alerts: AlertService,
    private fileGenerationService: FileGenerationService,
    private maskSensitiveKeys: MaskSensitiveKeys
  ) {
    this.showFilter = false;
    this.initializeForm();
  }

  getMerchantTransactions() {
    this.isLoading = true;
    this.allTransactions = [];
    this.merchants
      .adminGetMerchantTransactionsForAcquirers(
        this.acquirerId,
        this.pageIndex,
        this.pageSize
      )
      .subscribe(
        (data) => {
          this.transactionsWrapper = data;
          this.allTransactions = data.content;
          this.dataCount = data.totalElements;
          this.isLoading = false;
          this.loadPagination = true;

          this.paginationService.pagerState.next({
            totalElements: this.dataCount,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          });
        },
        (error) => {
          console.error(error);
          this.isLoading = false;
          this.loadPagination = true;
          this.paginationService.pagerState.next(null);
          this.alerts.error(error);
        }
      );
  }

  beginDownload() {
    this.exportMerchantTransactions();
  }

  exportMerchantTransactions() {
    const temp: any[] = [];
    const pageSize = this.pageSize;

    this.pageSize = this.transactionsWrapper.totalElements;
    this.pageIndex = 0;

    this.merchants
      .adminGetMerchantTransactionsForAcquirers(
        this.acquirerId,
        this.pageIndex,
        this.pageSize
      )
      .subscribe(
        (data: any) => {
          this.exportedTransactionRecords = data.content;
          this.pageSize = pageSize;
          for (
            let idx = 0;
            idx < this.exportedTransactionRecords.length;
            idx++
          ) {
            temp.push([]);
            temp[idx]['Merchant Name'] = this.clean('mid', idx);
            temp[idx]['Terminal ID'] = this.clean('tid', idx);
            temp[idx]['RRN'] = this.clean('rrn', idx);
            temp[idx]['STAN'] = this.clean('stan', idx);
            temp[idx]['Pan/Account'] = this.clean('pan', idx);
            temp[idx]['Amount'] = this.clean('amount', idx);
            temp[idx]['Type'] = this.clean('type', idx);
            temp[idx]['Currency'] =
              this.clean('currencyCode', idx) +
              '(' +
              this.clean('currencyAlpha', idx) +
              ')';
            temp[idx]['Status'] = this.clean('status', idx);
            temp[idx]['Date/Time'] = this.clean('creationDate', idx);
          }
          this.exportedTransactionRecords = temp;
          this.exportRecords();
        },
        (error) => {
          this.fileGenerationService.onDownloadCompleted.next(false);
          this.alerts.error(
            'Merchants transactions download could not be completed'
          );
        }
      );
  }
  exportRecords() {
    const headers = [
      'Merchant',
      'Terminal ID',
      'RRN',
      'STAN',
      'PAN/Account',
      'Amount',
      'Currency',
      'Type',
      'Status',
      'Date/Time',
    ];
    this.fileGenerationService.generateCSV(
      this.exportedTransactionRecords,
      headers,
      `${this.merchantId} Transactions`
    );
    this.fileGenerationService.onDownloadCompleted.next(true);
  }

  clean(key: string, index: number) {
    return this.exportedTransactionRecords[index][key]
      ? this.exportedTransactionRecords[index][key]
      : '';
  }

  onRefreshData(payload: { pageSize: number; pageIndex: number }) {
    this.pageIndex = payload.pageIndex;
    this.pageSize = payload.pageSize;

    this.getMerchantTransactions();
  }

  requestPageSize(newSize: number) {
    this.pageSize = newSize;
    this.getMerchantTransactions();
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      // this.merchantId = params.get('merchantId');
      this.acquirerId = params.get('acquirerId');
    });
    this.pageIndex = 0;
    this.pageSize = 10;
    this.getMerchantTransactions();
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
