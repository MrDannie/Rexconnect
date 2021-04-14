import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-acquirer-merchant-details',
  templateUrl: './acquirer-merchant-details.component.html',
  styleUrls: ['./acquirer-merchant-details.component.scss'],
})
export class AcquirerMerchantDetailsComponent implements OnInit {
  merchantId: any;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.merchantId = this.route.snapshot.params.id;
  }
}
