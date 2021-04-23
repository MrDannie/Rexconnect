// tslint:disable
import { IWrapper } from './../../../../shared/interfaces/wrapper.model';
import { FileGenerationService } from './../../../../shared/services/file-generation.service';
import { ValidationService } from '../../../../../core/validation.service';
import { ErrorHandler } from './../../../../shared/services/error-handler.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMerchant } from '../../../../../pages/shared/interfaces/merchants.model';
import { PaginationService } from '../../../../../core/pagination.service';
import { MerchantsService } from '../../../../../pages/shared/services/merchants.service';
import { AlertService } from '../../../../../core/alert/alert.service';
import {
  countries,
  merchantCodes,
  currencies,
  states,
} from '../../../../../pages/shared/constants';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { ProfileManagementService } from 'src/app/pages/shared/services/profile-management.service';

declare var $: any;

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
    private profileMgt: ProfileManagementService
  ) {
    this.messages = this.validationMessages;
  }

  getAllMerchants(merchantId?, status?) {
    this.isLoading = true;
    this.merchants
      .getAllMerchants(this.pageIndex, this.pageSize, merchantId, status)
      .subscribe(
        (data) => {
          this.merchantsWrapper = data;
          this.allMerchants = data.content;
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

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
  }

  beginDownload() {
    const merchantId = this.searchForm.value.merchantId || '';
    this.exportMerchants(merchantId);
    this.isCSVLoading = true;
  }

  exportMerchants(merchantId: string = '') {
    const temp: any[] = [];
    const pageSize = this.pageSize;

    const downloadPageSize = this.dataCount;
    // this.pageIndex = 0;

    this.merchants
      .getAllMerchants(
        0,
        downloadPageSize,
        this.searchForm.value.merchantId,
        this.searchForm.value.status
      )
      .subscribe(
        (data: any) => {
          this.merchantRecordsToDownload = data.content;

          for (
            let idx = 0;
            idx < this.merchantRecordsToDownload.length;
            idx++
          ) {
            temp.push([]);
            temp[idx]['Merchant Name'] = this.clean('merchantName', idx);
            temp[idx]['Merchant ID'] = this.clean('merchantId', idx);
            temp[idx]['Merchant Category Code'] = this.clean(
              'merchantCategoryCode',
              idx
            );
            temp[idx]['Status'] = this.merchantRecordsToDownload[idx][
              'isActive'
            ]
              ? 'Active'
              : 'Inactive';
          }
          // this.allMerchants = temp;
          this.exportRecords(temp);
        },
        (err) => {
          this.alertService.error(err);
        }
      );
  }

  exportRecords(temp) {
    const headers = [
      'Merchant Name',
      'Merchant ID',
      'Merchant Category Code',
      'Status',
    ];
    this.fileGenerationService.generateCSV(temp, headers, 'Merchants');
    this.fileGenerationService.onDownloadCompleted.next(true);
    this.isCSVLoading = false;
  }

  clean(key: string, index: number) {
    return this.merchantRecordsToDownload[index][key]
      ? this.merchantRecordsToDownload[index][key]
      : '';
  }

  requestPageSize(newSize: number) {
    this.pageSize = newSize;
    this.getAllMerchants();
  }

  onRefreshData(payload: { pageIndex: number; pageSize: number }) {
    this.pageIndex = payload.pageIndex;
    this.pageSize = payload.pageSize;

    this.getAllMerchants(this.merchantIdToFilter, this.statusToFilter);
  }

  clearFilters() {
    this.searchForm.reset();

    this.pageIndex = 0;
    this.pageSize = 10;

    this.getAllMerchants();
  }

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.isFiltering = false;
    this.getAllMerchants();
    this.initializeForm();

    this.storedCities = states.STATES;

    this.getCategoryCodes();
    this.getCountries();
    this.getCurrencyCodes();
    this.getMerchantTimezones();

    this.getPermissions();

    this.getUserSettings();

    $('#createMerchant').on('hidden.bs.modal', this.resetForm.bind(this));
  }
  getUserSettings() {
    this.profileMgt.getUserSettings().subscribe(
      (response) => {
        console.log(response);
        this.userSettings = response;
      },
      (error) => {
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  getMerchantTimezones() {
    const timeZones = this.storageService.getTimezones();
    if (timeZones) {
      // dont fetch data
      console.log('RECSDEFDJFFHFHHFHFHFH');

      this.allTimeZones = timeZones;
    } else {
      this.merchants.getTimezones().subscribe((response) => {
        console.log('THese are the time zones', response);
        this.allTimeZones = response['data'];
        this.storageService.storeTimeZones(response.data);
      });
    }
  }

  resetForm() {
    this.createMerchantForm.reset();
    this.createMerchantForm.patchValue({
      categoryCode: '',
    });
  }

  searchBy(value) {
    this.pageIndex = 0;

    console.log('FILTER', value);
    this.isFiltering = true;
    let { merchantId, status } = value;

    if (!value.merchantId) {
      delete value.merchantId;
      merchantId = '';
    } else {
      merchantId = value.merchantId;
    }

    if (!value.status) {
      delete value.status;
      status = '';
    } else {
      status = value.status;
    }

    this.merchantIdToFilter = merchantId;
    this.statusToFilter = status;
    this.getAllMerchants(this.merchantIdToFilter, this.statusToFilter);
  }

  // utils
  getCountries() {
    this.countryCodes = countries.COUNTRY_CODES;
    this.countryCodes = this.countryCodes.map(function (country) {
      country.fullCountryLabel =
        country['ISO3166-1-Alpha-3'] +
        ' ' +
        '(' +
        country['ISO3166-1-numeric'] +
        ')';
      return country;
    });
  }

  getCategoryCodes() {
    this.merchantCategoryCodes = merchantCodes.MERCHANT_CODES;
    this.merchantCategoryCodes = this.merchantCategoryCodes.map(function (cat) {
      cat.fullCatLabel =
        cat['Program Type'] + ' ' + '(' + cat['MCC CODE'] + ')';
      return cat;
    });
  }

  getCurrencyCodes() {
    this.currencyCodes = currencies.CURRENCY_CODES;
    this.currencyCodes = this.currencyCodes.map(function (curr) {
      curr.fullCurrencyLabel =
        curr['ISO4217-currency_name'] +
        ' ' +
        '(' +
        curr['ISO4217-currency_numeric_code'] +
        ')';
      return curr;
    });
  }

  extract(input: string): string {
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(input);
    return matches[1];
  }

  onSelectCountryCode(countryCode) {
    const countryObj = countries.COUNTRY_CODES.find((country) => {
      return country['ISO3166-1-numeric'] == countryCode;
    });
    const countryAlpha2 = countryObj['ISO3166-1-Alpha-2'];
    this.getAllCities(countryAlpha2);
  }

  getAllCities(code) {
    this.allCities = [];
    this.isLoadingCities = true;
    console.log('SDafadsfasdfasdf', this.storedCities);

    this.allCities = this.storedCities.filter(
      (e) => e.country_code === String(code)
    );
    this.isLoadingCities = false;
  }

  addNewMerchant() {
    this.isCreatingMerchant = true;
    const newMerchant = {
      merchantName: this.createMerchantForm.value.merchantName,
      merchantId: this.createMerchantForm.value.merchantId,
      merchantToken: this.createMerchantForm.value.merchantToken,
      merchantCategoryCode: Number(this.createMerchantForm.value.categoryCode),
      merchantKey: this.createMerchantForm.value.merchantKey,
      currencyCode: String(this.createMerchantForm.value.currency),
      countryCode: Number(this.createMerchantForm.value.countryCode),
      city: this.createMerchantForm.value.city,
      timezoneId: +this.createMerchantForm.value.timezoneId,
    };
    this.merchants.addNewMerchant(newMerchant).subscribe(
      (response) => {
        this.isCreatingMerchant = false;
        this.closeModal('cancel_button_add_merchant');
        this.alertService.success('Merchant created successfully!');
        this.getAllMerchants();
      },
      (error) => {
        this.isCreatingMerchant = false;
        this.alertService.error(error);
      }
    );
  }

  closeModal(id: string) {
    document.getElementById(id).click();
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      merchantId: '',
      status: '',
    });
    this.createMerchantForm = this.fb.group({
      merchantName: ['', Validators.required],
      merchantKey: [''],
      merchantId: [
        '',
        Validators.compose([
          Validators.maxLength(15),
          Validators.minLength(15),
        ]),
      ],
      currency: ['', Validators.required],
      categoryCode: ['', Validators.required],
      countryCode: ['', Validators.required],
      city: ['', Validators.required],
      merchantToken: [''],
      timezoneId: ['', Validators.required],
    });
  }
}
