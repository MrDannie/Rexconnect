import { SharedModule } from './../../../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageMerchantRoutingModule } from './manage-merchant-routing.module';
import { MerchantDetailsComponent } from './merchant-details/merchant-details.component';
import { MerchantTransactionComponent } from './merchant-transaction/merchant-transaction.component';
import { ManageMerchantComponent } from './manage-merchant/manage-merchant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MerchantsComponent } from './merchants/merchants.component';

@NgModule({
  declarations: [
    MerchantDetailsComponent,
    MerchantTransactionComponent,
    ManageMerchantComponent,
    MerchantsComponent,
  ],
  imports: [
    CommonModule,
    ManageMerchantRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class ManageMerchantModule {}
