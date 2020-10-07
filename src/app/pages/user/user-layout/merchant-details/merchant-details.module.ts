import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MerchantDetailsRoutingModule } from './merchant-details-routing.module';
import { DetailsComponent } from './details/details.component';
import { MerchantTransactionComponent } from './merchant-transaction/merchant-transaction.component';

@NgModule({
  declarations: [DetailsComponent, MerchantTransactionComponent],
  imports: [
    CommonModule,
    MerchantDetailsRoutingModule
  ]
})
export class MerchantDetailsModule { }
