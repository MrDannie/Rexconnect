import { ActivatedRoute, Params } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { IMerchant } from './../../../../shared/interfaces/merchants.model';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
import { PaginationService } from 'src/app/core/pagination.service';
// tslint:disable
import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-manage-merchant',
  templateUrl: './manage-merchant.component.html',
  styleUrls: ['./manage-merchant.component.scss'],
})
export class ManageMerchantComponent implements OnInit {
  merchant: IMerchant;
  merchantId;
  merchantName;
  disablingMerchant: boolean = false;
  merchantStatus: boolean = null;

  constructor(
    private merchants: MerchantsService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.merchantId = this.route.snapshot.params.id;
    console.log('this is merchant ID', this.merchantId);

    this.getMerchant();
  }
  getMerchant() {
    this.merchants.getMerchant(this.merchantId).subscribe((response) => {
      console.log('Merchant Gotten', response);
      this.merchantName = response['merchantName'];
      this.merchantStatus = response.isActive;
    });
  }

  disableMerchant(merchantId) {
    this.disablingMerchant = true;
    this.merchants.disableMerchant(merchantId).subscribe(
      (response) => {
        console.log('DISABLED RESPONSE', response);
        this.alertService.success('Merchant Disabled Successfully');
        this.disablingMerchant = false;
        $('#disableMerchantModal').modal('hide');
        this.merchantStatus = false;
      },
      (error) => {
        this.alertService.error(error);
        this.merchantStatus = true;
      }
    );
  }

  enableMerchant() {
    this.merchants.enableMerchant(this.merchantId).subscribe(
      (response) => {
        this.alertService.success('Merchant Enabled Successfully');
        this.merchantStatus = true;
      },
      (error) => {
        this.alertService.error(error);
      }
    );
  }
}
