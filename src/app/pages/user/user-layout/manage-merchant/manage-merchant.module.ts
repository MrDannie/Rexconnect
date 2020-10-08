import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageMerchantRoutingModule } from './manage-merchant-routing.module';
import { MerchantDetailsComponent } from './merchant-details/merchant-details.component';
import { MerchantTransactionComponent } from './merchant-transaction/merchant-transaction.component';
import { ManageMerchantComponent } from './manage-merchant/manage-merchant.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MerchantDetailsComponent,
    MerchantTransactionComponent,
    ManageMerchantComponent,
  ],
  imports: [
    CommonModule,
    ManageMerchantRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ManageMerchantModule {}
