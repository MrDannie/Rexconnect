import { Component, ErrorHandler, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { ValidationService } from 'src/app/core/validation.service';
import { IMerchant } from 'src/app/pages/shared/interfaces/merchants.model';
import { IWrapper } from 'src/app/pages/shared/interfaces/wrapper.model';
import { FileGenerationService } from 'src/app/pages/shared/services/file-generation.service';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
import { ProfileManagementService } from 'src/app/pages/shared/services/profile-management.service';

@Component({
  selector: 'app-acquirer-merchants',
  templateUrl: './acquirer-merchants.component.html',
  styleUrls: ['./acquirer-merchants.component.scss'],
})
export class AcquirerMerchantsComponent implements OnInit {
  showFilter = false;
  allMerchants: any = [];

  dataCount: number;
  isLoaded = false;
  isLoading = false;

  pageSize: number;
  pageIndex: number;

  searchForm: FormGroup;
  createMerchantForm: FormGroup;

  countryCodes: any;
  currencyCodes: any;
  merchantCategoryCodes: any;
  allCities: any[] = [];
  storedCities: any[];
  isLoadingCities: boolean;
  isCreatingMerchant: boolean;
  isFiltering: boolean;

  merchantsWrapper: IWrapper<IMerchant>;

  messages: any;
  allTimeZones: any;
  isCSVLoading: boolean;
  autoMidState: any;
  userRecordsToDownload: any;
  merchantRecordsToDownload: any;
  permissions: any;
  merchantIdToFilter: any;
  statusToFilter: any;
  userSettings: any;
  merchantId: any;
  acquirerId: any;
  // allMerchants: any;

  constructor(
    private paginationService: PaginationService,
    private merchants: MerchantsService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private errorHandler: ErrorHandler,
    private validationMessages: ValidationService,
    private fileGenerationService: FileGenerationService,
    private storageService: StorageService,
    private profileMgt: ProfileManagementService,
    private route: ActivatedRoute
  ) {
    this.messages = this.validationMessages;
  }

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.isFiltering = false;
    // this.initializeForm();
    this.acquirerId = this.route.snapshot.params.id;
    this.getAllMerchants();
  }
  getAllMerchants(merchantId?, status?) {
    this.isLoading = true;
    this.merchants
      .getAllMerchants(
        this.pageIndex,
        this.pageSize,
        merchantId,
        status,
        this.acquirerId
      )
      .subscribe(
        (data) => {
          this.merchantsWrapper = data;
          this.allMerchants = data.content;
          console.log('adfadsfasdfasdfadsf', this.allMerchants);

          this.dataCount = data.totalElements;

          this.isLoading = false;
          this.isLoaded = true;
          this.showFilter = false;
          this.isFiltering = false;

          this.paginationService.pagerState.next({
            totalElements: this.dataCount,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          });
        },
        (error) => {
          this.isLoaded = true;
          this.isLoading = false;
          this.isFiltering = false;
          this.paginationService.pagerState.next(null);
          this.alertService.error(error);
        }
      );
  }

  searchBy(data) {}

  requestPageSize(data) {}

  beginDownload() {}

  onRefreshData(data) {}

  clearFilters() {}
}
