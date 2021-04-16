import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-acquirer-merchant-transactions',
  templateUrl: './acquirer-merchant-transactions.component.html',
  styleUrls: ['./acquirer-merchant-transactions.component.scss'],
})
export class AcquirerMerchantTransactionsComponent implements OnInit {
  merchantId: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.merchantId = this.route.snapshot.params.id;
  }
}
