import { FileGenerationService } from './../../../../shared/services/file-generation.service';
import { IWrapper } from './../../../../shared/interfaces/wrapper.model';
import { ErrorHandler } from './../../../../shared/services/error-handler.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { ActivatedRoute, Params } from '@angular/router';
import { PaginationService } from 'src/app/core/pagination.service';
// tslint:disable
import { TerminalsService } from './../../../../shared/services/terminals.service';
import { Component, OnInit } from '@angular/core';
import { ITransaction } from 'src/app/pages/shared/interfaces/transactions.model';

@Component({
  selector: 'app-terminal-transactions',
  templateUrl: './terminal-transactions.component.html',
  styleUrls: ['./terminal-transactions.component.scss']
})
export class TerminalTransactionsComponent implements OnInit {

  terminalTransactions: ITransaction[] = [];
  terminalTransactionsWrapper: IWrapper<ITransaction>;
  terminalId: string;

  pageSize: number;
  pageIndex: number;

  dataCount: number;
  isLoading: boolean;
  loadPagination: boolean;
  exportedTransactionRecords: any;

  constructor(
    private terminals: TerminalsService,
    private paginationService: PaginationService,
    private route: ActivatedRoute,
    private alerts: AlertService,
    private errorHandler: ErrorHandler,
    private fileGenerationService: FileGenerationService
  ) { }

  getTransactions() {
    this.isLoading = true;
    this.terminalTransactions = [];
    this.terminals.getAllTerminalTransactions(this.terminalId, this.pageSize, this.pageIndex).subscribe(
      data => {
        this.terminalTransactionsWrapper = data;
        this.terminalTransactions = data.content;
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
    )
  }

  beginDownload() {
    this.exportMerchantTransactions();
  }

  exportMerchantTransactions() {
    const temp: any[] = [];
    const pageSize = this.pageSize;

    this.pageSize = this.terminalTransactionsWrapper.totalElements;
    this.pageIndex = 0;

    this.terminals.getAllTerminalTransactions(this.terminalId, this.pageSize, this.pageIndex).subscribe(
      (data: any) => {
        this.exportedTransactionRecords = data.content;
        this.pageSize = pageSize;
        for (let idx = 0; idx < this.exportedTransactionRecords.length; idx++) {
          temp.push([]);
          temp[idx]['Merchant Name'] = this.clean('mid', idx);
          temp[idx]['Terminal ID'] = this.clean('tid', idx);
          temp[idx]['RRN'] = this.clean('rrn', idx);
          temp[idx]['STAN'] = this.clean('stan', idx);
          temp[idx]['Pan/Account'] = this.clean('pan', idx);
          temp[idx]['Amount'] = this.clean('amount', idx);
          temp[idx]['Type'] = this.clean('type', idx);
          temp[idx]['Currency'] = this.clean('currencyCode', idx) + '(' + this.clean('currencyAlpha', idx) + ')';
          temp[idx]['Status'] = this.clean('status', idx);
          temp[idx]['Date/Time'] = this.clean('creationDate', idx);

        }
        this.exportedTransactionRecords = temp;
        this.exportRecords();

      },
      error => {
        this.fileGenerationService.onDownloadCompleted.next(false);
        this.alerts.error('Terminal transactions download could not be completed');
      }
    );

  }
  exportRecords() {
    const headers = ['Merchant', 'Terminal ID', 'RRN', 'STAN', 'PAN/Account', 'Amount', 'Currency', 'Type', 'Status', 'Date/Time'];
    this.fileGenerationService.generateCSV(this.exportedTransactionRecords, headers, `${ this.terminalId } Transactions`);
    this.fileGenerationService.onDownloadCompleted.next(true);
  }

  clean(key: string, index: number) {
    return this.exportedTransactionRecords[index][key] ? this.exportedTransactionRecords[index][key] : '';
  }

  onRefreshData(payload: { pageSize: number, pageIndex: number }) {
    this.pageIndex = payload.pageIndex;
    this.pageSize = payload.pageSize;

    this.getTransactions();
  }

  requestPageSize(newSize: number) {
    this.pageSize = newSize;
    this.getTransactions();
  }

  ngOnInit() {
    this.pageIndex = 0;
    this.pageSize = 10;
    this.route.params.subscribe((params: Params) => {
      this.terminalId = params.id;
      this.getTransactions();
    })
  }

}
