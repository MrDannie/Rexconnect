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

  constructor() { }

  ngOnInit() {
  }

}
