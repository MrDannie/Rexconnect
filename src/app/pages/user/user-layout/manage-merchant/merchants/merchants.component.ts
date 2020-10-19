// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IMerchant } from 'src/app/pages/shared/interfaces/merchants.model';
import { PaginationService } from 'src/app/core/pagination.service';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { countries, merchantCodes, currencies } from 'src/app/pages/shared/constants';

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
  allCities: any[];
  isLoadingCities: boolean;
  isCreatingMerchant: boolean;

  constructor(
    private paginationService: PaginationService,
    private merchants: MerchantsService,
    private alerts: AlertService,
    private fb: FormBuilder
  ) { }

  getAllMerchants(merchantId: string = '') {
    this.isLoading = true;
    this.allMerchants = [];
    this.merchants.getAllMerchants(this.pageIndex, this.pageSize, merchantId).subscribe(
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

    this.getCategoryCodes();
    this.getCountries();
    this.getCurrencyCodes();
  }

  searchBy() {
    this.showFilter = false;
    const merchantId = this.searchForm.value.merchantId || '';
    if (merchantId) {
      this.getAllMerchants(merchantId);
    }
  }

  // utils
  getCountries() {
    this.countryCodes = countries.COUNTRY_CODES;
    this.countryCodes = this.countryCodes.map(function(country) {
      country.fullCountryLabel = country['ISO3166-1-Alpha-3'] + ' ' + '(' + country['ISO3166-1-numeric'] + ')';
      return country;
    });
  }

  getCategoryCodes() {
    this.merchantCategoryCodes = merchantCodes.MERCHANT_CODES;
    this.merchantCategoryCodes = this.merchantCategoryCodes.map(function (cat) {
      cat.fullCatLabel = cat['Program Type'] + ' ' + '(' + cat['MCC CODE'] + ')';
      return cat;
    });
  }

  getCurrencyCodes() {
    this.currencyCodes = currencies.CURRENCY_CODES;
    this.currencyCodes = this.currencyCodes.map(function (curr) {
      curr.fullCurrencyLabel = curr['ISO4217-currency_name'] + ' ' + '(' + curr['ISO4217-currency_numeric_code'] + ')';
      return curr;
    });
  }

  extract(input: string): string {
    var regExp = /\(([^)]+)\)/;
    var matches = regExp.exec(input);
    return matches[1];
  }

  onSelectCountryCode(countryCode) {
    this.getAllCities(countryCode);
  }

  getAllCities(code) {
    this.allCities = [];
    this.isLoadingCities = true;
    this.merchants.getAllCities(code).subscribe(
      (response) => {
        this.allCities = response;
        this.isLoadingCities = false;
        this.allCities = this.allCities.map(function (city) {
          city.fullCityLabel = city.name + ' ' + '(' + city.id + ')';
          return city.fullCityLabel;
        });
      },
      (error) => {
        this.isLoadingCities = false;
        this.alerts.warn('Error occurred while getting cities');
      }
    );
  }

  addNewMerchant() {
    this.isCreatingMerchant = true;
    const newMerchant = {
      merchantName: this.createMerchantForm.value.merchantName,
      merchantId: this.createMerchantForm.value.merchantId,
      merchantToken: this.createMerchantForm.value.merchantToken,
      merchantCategoryCode: Number(this.createMerchantForm.value.categoryCode),
      merchantKey: this.createMerchantForm.value.merchantKey,
      currencyCode: this.createMerchantForm.value.currency,
      countryCode: this.createMerchantForm.value.countryCode,
      city: this.createMerchantForm.value.city || 'stub'
    }
    this.merchants.addNewMerchant(newMerchant)
      .subscribe(
        response => {
          this.isCreatingMerchant = false;
          this.closeModal('cancel_button_add_merchant');
          this.alerts.success('Merchant created successfully!');
          this.getAllMerchants();
        },
        error => {
          this.isCreatingMerchant = false;
          this.alerts.warn('Error occurred while creating merchant');
        }
      )

  }

  closeModal(id: string) {
    document.getElementById(id).click();
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
      merchantName: ['', Validators.required],
      merchantKey: ['', Validators.required],
      merchantId: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(15)])],
      currency: ['', Validators.required],
      categoryCode: ['', Validators.required],
      countryCode: ['', Validators.required],
      city: ['', Validators.required],
      merchantToken: ['', Validators.required]
    });
  }

  reset() {}
  generateCSV() {}

  createUser(value) {}
}
