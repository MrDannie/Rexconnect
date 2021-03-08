import { ErrorHandler } from './../../../../shared/services/error-handler.service';
import { ITerminal } from './../../../../shared/interfaces/terminals.model';
import { merchantCodes } from 'src/app/pages/shared/constants';
import { currencies, countries, states } from './../../../../shared/constants';
import { AlertService } from 'src/app/core/alert/alert.service';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
import { IMerchant } from './../../../../shared/interfaces/merchants.model';
import { ActivatedRoute, Params } from '@angular/router';
// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/core/helpers/storage.service';

@Component({
  selector: 'app-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.scss'],
})
export class MerchantDetailsComponent implements OnInit {
  expression: boolean;

  updateMerchantForm: FormGroup;
  merchantId: string;
  merchantDetails: IMerchant;
  merchantTerminals: ITerminal[] = [];
  isLoadingTerminals = false;
  isUpdatingMerchant = false;
  isLoadingCities = false;
  merchantCategoryCodes: any[];
  currencyCodes: any[];
  countryCodes: any[];
  allCities: any[] = [];
  storedCities: {
    country_code: string;
    subdivision_name: string;
    code: string;
  }[];

  citiesMap = new Map();
  allTimeZones: any;
  autoMidState: any;
  permissions: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private merchants: MerchantsService,
    private alerts: AlertService,
    private errorHandler: ErrorHandler,
    private storageService: StorageService
  ) {
    this.initializeForm();
  }

  getMerchantDetails() {
    this.isLoadingTerminals = true;
    this.merchants.getMerchant(this.merchantId).subscribe(
      (data) => {
        this.merchantDetails = data;
        console.log('THIS IS MERCHNT DETAILS', this.merchantDetails);

        this.populateEditForm();
        // forward terminal loading to next method
        this.getMerchantTerminals();
      },
      (error) => {
        this.isLoadingTerminals = false;
        this.alerts.error(error);
      }
    );
  }

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
  }

  getAutoMidState() {
    this.autoMidState = this.storageService.getCurrentUser().user.autoMID;
    console.log('AUTO MID STATE', this.autoMidState);
  }
  updateMerchant() {
    this.isUpdatingMerchant = true;
    const updatedMerchant = {
      merchantName: this.updateMerchantForm.value.merchantName,
      merchantId: this.updateMerchantForm.value.merchantId,
      merchantToken: this.updateMerchantForm.value.merchantToken,
      merchantCategoryCode: Number(this.updateMerchantForm.value.categoryCode),
      merchantKey: this.updateMerchantForm.value.merchantKey,
      currencyCode: this.updateMerchantForm.value.currency,
      countryCode: Number(this.updateMerchantForm.value.countryCode),
      city: this.updateMerchantForm.value.city,
      timezoneId: +this.updateMerchantForm.value.timezoneId,
    };
    console.log(updatedMerchant);
    this.merchants.updateMerchant(this.merchantId, updatedMerchant).subscribe(
      (response) => {
        this.isUpdatingMerchant = false;
        this.closeModal('cancel_button_edit_merchant');
        this.alerts.success('Merchant updated successfully!');
        this.getMerchantDetails();
      },
      (error) => {
        this.isUpdatingMerchant = false;
        this.alerts.error(error);
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

  closeModal(id) {
    document.getElementById(id).click();
  }

  getMerchantTerminals() {
    this.isLoadingTerminals = true;
    this.merchants
      .getMerchantTerminals(this.merchantDetails.merchantId)
      .subscribe(
        (data) => {
          this.merchantTerminals = data.content;
          this.isLoadingTerminals = false;
        },
        (error) => {
          this.isLoadingTerminals = false;
          this.alerts.error(error);
        }
      );
  }

  getCurrencyName(code) {
    const currencyName = currencies.CURRENCY_CODES.find((curr) => {
      return curr['ISO4217-currency_numeric_code'] == code;
    })['ISO4217-currency_name'];
    return currencyName;
  }

  getCountryName(code) {
    const countryName = countries.COUNTRY_CODES.find((country) => {
      return country['ISO3166-1-numeric'] == code;
    })['ISO3166-1-Alpha-3'];
    return countryName;
  }

  getMCCodes(code) {
    const mcc = merchantCodes.MERCHANT_CODES.find((merchant) => {
      return merchant['MCC CODE'] == code;
    })['Program Type'];
    return mcc;
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
    this.allCities = this.storedCities.filter(
      (e) => e.country_code === String(code)
    );
    this.isLoadingCities = false;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.merchantId = params.id;
      this.getMerchantDetails();
    });
    this.storedCities = states.STATES;
    this.getCategoryCodes();
    this.getCountries();
    this.getCurrencyCodes();
    this.getMerchantTimezones();
    this.getAutoMidState();

    this.getPermissions();
  }

  populateEditForm() {
    let actualCountryCode;
    const countryCode = this.merchantDetails.countryCode;
    if (isNaN(Number(countryCode))) {
      const countryObj = countries.COUNTRY_CODES.find((country) => {
        return country['ISO3166-1-Alpha-2'] == countryCode;
      });
      actualCountryCode = countryObj['ISO3166-1-numeric'];
      this.getAllCities(countryCode);
    } else {
      actualCountryCode = countryCode;
      const countryObj = countries.COUNTRY_CODES.find((country) => {
        return country['ISO3166-1-numeric'] == Number(countryCode);
      });
      this.getAllCities(countryObj['ISO3166-1-Alpha-2']);
    }

    this.updateMerchantForm.patchValue({
      merchantName: this.merchantDetails.merchantName,
      merchantKey: this.merchantDetails.merchantKey,
      merchantId: this.merchantDetails.merchantId,
      currency: this.merchantDetails.currencyCode,
      categoryCode: this.merchantDetails.merchantCategoryCode,
      countryCode: actualCountryCode,
      city: this.merchantDetails.city,
      merchantToken: this.merchantDetails.merchantToken,
      timezoneId: +this.merchantDetails.timezoneId,
    });
  }

  initializeForm() {
    this.updateMerchantForm = this.formBuilder.group({
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
