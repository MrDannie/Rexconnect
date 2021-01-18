import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcquirerDetailsComponent } from './acquirer-details/acquirer-details.component';
import { AcquirerFeeSharingComponent } from './acquirer-fee-sharing/acquirer-fee-sharing.component';
import { AcquirerRouteDetailsComponent } from './acquirer-route-details/acquirer-route-details.component';
import { AcquirerRoutesComponent } from './acquirer-routes/acquirer-routes.component';
import { AcquirerComponent } from './acquirer/acquirer.component';
import { AddRoutesComponent } from '../manage-routes/add-routes/add-routes.component';
import { ManageAcquirerComponent } from './manage-acquirer/manage-acquirer.component';
import { AddAcquirerComponent } from './add-acquirer/add-acquirer.component';

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
        ],
      },
      {
        path: 'add-routes/:id',
        component: AddRoutesComponent,
      },
      {
        path: 'acquirer-routes/:id',
        component: AcquirerRouteDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ManageAcquirerRoutingModule {}
