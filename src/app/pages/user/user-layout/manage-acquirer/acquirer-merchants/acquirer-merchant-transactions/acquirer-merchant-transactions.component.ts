import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acquirer-merchant-transactions',
  templateUrl: './acquirer-merchant-transactions.component.html',
  styleUrls: ['./acquirer-merchant-transactions.component.scss'],
})
export class AcquirerMerchantTransactionsComponent implements OnInit {
  merchantId: string;

  constructor() {}

  ngOnInit() {
    // this.merchantId = 'FBP204011021989';
  }
}
