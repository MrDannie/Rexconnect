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
  terminalId: string;

  pageSize: number;
  pageIndex: number;

  dataCount: number;
  isLoading: boolean;
  loadPagination: boolean;

  constructor(
    private terminals: TerminalsService,
    private paginationService: PaginationService,
    private route: ActivatedRoute,
    private alerts: AlertService
  ) { }

  getTransactions() {
    this.isLoading = true;
    this.terminalTransactions = [];
    this.terminals.getAllTerminalTransactions(this.terminalId, this.pageSize, this.pageIndex).subscribe(
      data => {
        this.terminalTransactions = data.content;
        this.dataCount = data.totalElements;
        this.isLoading = false;
        this.loadPagination = true;

        this.paginationService.changePagerState.next(true);
      },
      error => {
        console.error(error);
        this.isLoading = false;
        this.loadPagination = true;
        this.paginationService.changePagerState.next(false);
        this.alerts.warn('Error occurred while getting this terminal\'s transactions');
      }
    )
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
