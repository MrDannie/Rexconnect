import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageMerchantComponent } from './manage-merchant/manage-merchant.component';
import { MerchantDetailsComponent } from './merchant-details/merchant-details.component';
import { MerchantTransactionComponent } from './merchant-transaction/merchant-transaction.component';
import { MerchantsComponent } from './merchants/merchants.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MerchantsComponent
      },
      {
        path: ':id',
        component: ManageMerchantComponent,
        children: [
          {
            path: '',
            redirectTo: 'merchant-details',
            pathMatch: 'full',
          },
          {
            path: 'merchant-details',
            component: MerchantDetailsComponent,
          },
          {
            path: 'merchant-transactions',
            component: MerchantTransactionComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ManageMerchantRoutingModule {}
