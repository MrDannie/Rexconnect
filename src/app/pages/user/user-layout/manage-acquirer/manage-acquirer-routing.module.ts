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
import { AcquirerTerminalsComponent } from './acquirer-terminals/acquirer-terminals.component';
import { AcquirerUsersComponent } from './acquirer-users/acquirer-users.component';
import { AcquirerMerchantsComponent } from './acquirer-merchants/acquirer-merchants.component';
import { AcquirerMerchantDetailsComponent } from './acquirer-merchants/acquirer-merchant-details/acquirer-merchant-details.component';
import { AcquirerMerchantTransactionsComponent } from './acquirer-merchants/acquirer-merchant-transactions/acquirer-merchant-transactions.component';

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
        path: ':id',
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
            path: 'acquirer-terminals',
            component: AcquirerTerminalsComponent,
          },
          {
            path: 'acquirer-merchants',
            component: AcquirerMerchantsComponent,
          },
          {
            path: 'acquirer-merchants/merchant-details/:id',
            component: AcquirerMerchantDetailsComponent,
          },
          {
            path: 'acquirer-merchants/merchant-transactions/:id',
            component: AcquirerMerchantTransactionsComponent,
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
