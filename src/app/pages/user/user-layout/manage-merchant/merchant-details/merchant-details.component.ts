import { ITerminal } from './../../../../shared/interfaces/terminals.model';
import { merchantCodes } from 'src/app/pages/shared/constants';
import { currencies, countries } from './../../../../shared/constants';
import { AlertService } from 'src/app/core/alert/alert.service';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
import { IMerchant } from './../../../../shared/interfaces/merchants.model';
import { ActivatedRoute, Params } from '@angular/router';
// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-merchant-details',
  templateUrl: './merchant-details.component.html',
  styleUrls: ['./merchant-details.component.scss'],
})
export class MerchantDetailsComponent implements OnInit {
  expression: boolean;

  createMerchantForm: FormGroup;
  merchantId: string;
  merchantDetails: IMerchant;
  merchantTerminals: ITerminal[] = [];
  isLoadingTerminals = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private merchants: MerchantsService,
    private alerts: AlertService
  ) {
    this.initializeForm();
  }

  getMerchantDetails() {
    this.isLoadingTerminals = true;
    this.merchants.getMerchant(this.merchantId).subscribe(
      (data) => {
        this.merchantDetails = data;
        // forward terminal loading to next method
        this.getMerchantTerminals();
      },
      error => {
        this.isLoadingTerminals = false;
        this.alerts.warn('Error occurred when getting merchant details');
        console.error(error);
      }
    )
  }

  getMerchantTerminals() {
    this.isLoadingTerminals = true;
    this.merchants.getMerchantTerminals(this.merchantDetails.merchantId).subscribe(
      data => {
        this.merchantTerminals = data.content;
        this.isLoadingTerminals = false;
      },
      error => {
        this.isLoadingTerminals = false;
        this.alerts.warn('Error occurred while getting merchant terminals');
      }
    )
  }

  getCurrencyName(code) {
    const currencyName = currencies.CURRENCY_CODES.find(curr => {
      return curr["ISO4217-currency_numeric_code"] == code;
    })["ISO4217-currency_name"];
    return currencyName;
  }

  getCountryName(code) {
    const countryName = countries.COUNTRY_CODES.find(country => {
      return country["ISO3166-1-numeric"] == code;
    })["ISO3166-1-Alpha-3"];
    return countryName;
  }

  getMCCodes(code) {
    const mcc = merchantCodes.MERCHANT_CODES.find(merchant => {
      return merchant["MCC CODE"] == code;
    })["Program Type"];
    return mcc;
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.merchantId = params.id;
      this.getMerchantDetails();
    })
  }

  initializeForm() {
    this.createMerchantForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }

}
