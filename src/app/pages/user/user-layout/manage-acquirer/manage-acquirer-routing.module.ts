import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcquirerDetailsComponent } from './acquirer-details/acquirer-details.component';
import { AcquirerFeeSharingComponent } from './acquirer-fee-sharing/acquirer-fee-sharing.component';
import { AcquirerRoutesComponent } from './acquirer-routes/acquirer-routes.component';
import { AcquirerComponent } from './acquirer/acquirer.component';
import { AddRoutesComponent } from '../manage-routes/add-routes/add-routes.component';
import { ManageAcquirerComponent } from './manage-acquirer/manage-acquirer.component';
import { AddAcquirerComponent } from './add-acquirer/add-acquirer.component';
import { AcquirerPtspsComponent } from './acquirer-ptsps/acquirer-ptsps.component';
import { UpdateAcquirerComponent } from './update-acquirer/update-acquirer.component';
import { AcquirerUsersComponent } from './acquirer-users/acquirer-users.component';
import { AcquirerMerchantsComponent } from './acquirer-merchants/acquirer-merchants.component';
import { AcquirerMerchantDetailsComponent } from './acquirer-merchants/acquirer-merchant-details/acquirer-merchant-details.component';
import { AcquirerMerchantTransactionsComponent } from './acquirer-merchants/acquirer-merchant-transactions/acquirer-merchant-transactions.component';
import { AcquirerMerchantTerminalsComponent } from './acquirer-merchants/acquirer-merchant-terminals/acquirer-merchant-terminals.component';
import { AcquirerTransactionsComponent } from './acquirer-transactions/acquirer-transactions.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: AcquirerComponent,
      },
      {
        path: 'add-acquirer',
        component: AddAcquirerComponent,
      },
      {
        path: 'edit-acquirer/:id',
        component: UpdateAcquirerComponent,
      },
      {
        path: ':acquirerId',
        component: ManageAcquirerComponent,
        children: [
          {
            path: '',
            redirectTo: 'acquirer-details',
            pathMatch: 'full',
          },
          {
            path: 'acquirer-details',
            component: AcquirerDetailsComponent,
          },
          {
            path: 'acquirer-fee-sharing',
            component: AcquirerFeeSharingComponent,
          },
          {
            path: 'acquirer-routes',
            component: AcquirerRoutesComponent,
          },
          {
            path: 'acquirer-ptsps',
            component: AcquirerPtspsComponent,
          },
          {
            path: 'acquirer-users',
            component: AcquirerUsersComponent,
          },

          {
            path: 'acquirer-merchants',
            component: AcquirerMerchantsComponent,
          },
          {
            path: 'acquirer-transactions',
            component: AcquirerTransactionsComponent,
          },
          {
            path: 'acquirer-merchants/:merchantId/merchant-details',
            component: AcquirerMerchantDetailsComponent,
          },
          {
            path: 'acquirer-merchants/:merchantId/merchant-transactions',
            component: AcquirerMerchantTransactionsComponent,
          },
          {
            path: 'acquirer-merchants/:merchantId/merchant-terminals',
            component: AcquirerMerchantTerminalsComponent,
          },
        ],
      },
      // {
      //   path: 'add-routes/:id',
      //   component: AddRoutesComponent,
      // },
      // {
      //   path: 'acquirer-routes/:id',
      //   component: AcquirerRoutesComponent,
      // },
    ]),
  ],
  exports: [RouterModule],
})
export class ManageAcquirerRoutingModule {}
