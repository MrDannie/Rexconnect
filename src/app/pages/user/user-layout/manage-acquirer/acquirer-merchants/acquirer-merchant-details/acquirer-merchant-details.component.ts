import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
import { merchantCodes } from 'src/app/pages/shared/constants';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  currencies,
  countries,
  states,
} from './../../../../../shared/constants';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { ITerminal } from 'src/app/pages/shared/interfaces/terminals.model';

@Component({
  selector: 'app-acquirer-merchant-details',
  templateUrl: './acquirer-merchant-details.component.html',
  styleUrls: ['./acquirer-merchant-details.component.scss'],
})
export class AcquirerMerchantDetailsComponent implements OnInit {
  merchantId: any;
  isLoadingTerminals: boolean;
  merchantDetails: any;
  updateMerchantForm: any;
  allCities: any[];
  storedCities: any;
  merchantTerminals: ITerminal[] = [];
  autoMidState: any;
  permissions: any;
  merchantCategoryCodes: any[];
  currencyCodes: any[];
  countryCodes: any[];

  isUpdatingMerchant = false;
  isLoadingCities: boolean = false;

  allTimeZones: any;

  constructor(
    private route: ActivatedRoute,
    private merchants: MerchantsService,
    private alerts: AlertService,
    private formBuilder: FormBuilder,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.merchantId = this.route.snapshot.params.id;

    this.storedCities = states.STATES;

    this.getCategoryCodes();

    this.getCountries();
    this.getCurrencyCodes();
    this.getMerchantTimezones();

    this.initializeForm();

    this.getMerchantDetails();

    this.getAutoMidState();

    this.getPermissions();
  }

  getMerchantDetails() {
    this.isLoadingTerminals = true;
    this.merchants.getMerchantDetailsForAdmin(this.merchantId).subscribe(
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

  getMCCodes(code) {
    const mcc = merchantCodes.MERCHANT_CODES.find((merchant) => {
      return merchant['MCC CODE'] == code;
    })['Program Type'];
    return mcc;
  }

  getCategoryCodes() {
    this.merchantCategoryCodes = merchantCodes.MERCHANT_CODES;
    this.merchantCategoryCodes = this.merchantCategoryCodes.map(function (cat) {
      cat.fullCatLabel =
        cat['Program Type'] + ' ' + '(' + cat['MCC CODE'] + ')';
      return cat;
    });
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

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
  }

  getCurrencyName(code) {
    const currencyName = currencies.CURRENCY_CODES.find((curr) => {
      return curr['ISO4217-currency_numeric_code'] == code;
    })['ISO4217-currency_name'];
    return currencyName;
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

  getAllCities(code) {
    this.allCities = [];
    this.isLoadingCities = true;
    this.allCities = this.storedCities.filter(
      (e) => e.country_code === String(code)
    );
    this.isLoadingCities = false;
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
    this.merchants
      .updateMerchant(this.merchantDetails.id, updatedMerchant)
      .subscribe(
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

  getAutoMidState() {
    this.autoMidState = this.storageService.getCurrentUser().user.autoMID;
    console.log('AUTO MID STATE', this.autoMidState);
  }

  closeModal(id) {
    document.getElementById(id).click();
  }

  onSelectCountryCode(countryCode) {
    const countryObj = countries.COUNTRY_CODES.find((country) => {
      return country['ISO3166-1-numeric'] == countryCode;
    });
    const countryAlpha2 = countryObj['ISO3166-1-Alpha-2'];
    this.getAllCities(countryAlpha2);
  }
}
