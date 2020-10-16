// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMerchant } from 'src/app/pages/shared/interfaces/merchants.model';
import { PaginationService } from 'src/app/core/pagination.service';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'app-merchants',
  templateUrl: './merchants.component.html',
  styleUrls: ['./merchants.component.scss'],
})
export class MerchantsComponent implements OnInit {

  showFilter = false;
  allMerchants: IMerchant[] = [];

  dataCount: number;
  isLoaded = false;
  isLoading = false;

  pageSize: number;
  pageIndex: number;

  searchForm: FormGroup;
  createMerchantForm: FormGroup;

  constructor(
    private paginationService: PaginationService,
    private merchants: MerchantsService,
    private alerts: AlertService,
    private fb: FormBuilder
  ) { }

  getAllMerchants(merchantId: string = '') {
    this.isLoading = true;
    this.allMerchants = [];
    this.merchants.getAllMerchants(this.pageIndex, this.pageIndex, merchantId).subscribe(
      data => {
        this.allMerchants = data.content;
        this.dataCount = data.totalElements;

        this.isLoading = false;
        this.isLoaded = true;

        this.paginationService.pagerState.next({
          totalElements: this.dataCount,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        });
      },
      error => {
        this.isLoaded = true;
        this.isLoading = false;
        this.paginationService.pagerState.next(null);
        this.alerts.warn('Error occurred while getting merchants');
      }
    )
  }

  requestPageSize(newSize: number) {
    this.pageSize = newSize;
    this.getAllMerchants();
  }

  onRefreshData(payload: { pageIndex: number, pageSize: number }) {
    this.pageIndex = payload.pageIndex;
    this.pageSize = payload.pageSize;

    this.getAllMerchants();
  }

  clearFilters() {
    this.searchForm.reset();
    this.getAllMerchants();
  }

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.getAllMerchants();
    this.initializeForm();
  }

  searchBy() {
    this.showFilter = false;
    const merchantId = this.searchForm.value.merchantId || '';
    if (merchantId) {
      this.getAllMerchants(merchantId);
    }
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      transactionType: [''],
      terminalId: [''],
      rrn: [''],
      approvalDate: [''],
      lastUpdateDate: [''],
      merchantId: ['']
    });
    this.createMerchantForm = this.fb.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }

  reset() {}
  generateCSV() {}

  createUser(value) {}
}
