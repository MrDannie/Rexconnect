import { ActivatedRoute, Params } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { IMerchant } from './../../../../shared/interfaces/merchants.model';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
import { PaginationService } from 'src/app/core/pagination.service';
// tslint:disable
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-merchant',
  templateUrl: './manage-merchant.component.html',
  styleUrls: ['./manage-merchant.component.scss']
})
export class ManageMerchantComponent implements OnInit {

  merchant: IMerchant;

  constructor(
    private merchants: MerchantsService,
    private route: ActivatedRoute,
    private alerts: AlertService
  ) { }

  getMerchantDetails(id) {
    this.merchants.getMerchant(id)
      .subscribe(
        data => {
          this.merchant = data;
        },
        error => {
          this.alerts.warn('Error occurred while retrieving merchant details');
        }
      )
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.getMerchantDetails(params.id);
    })
  }

}
