import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merchant-transaction',
  templateUrl: './merchant-transaction.component.html',
  styleUrls: ['./merchant-transaction.component.scss'],
})
export class MerchantTransactionComponent implements OnInit {
  ngForArray: number[];

  constructor() {}

  ngOnInit() {
    this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11];
  }
}
