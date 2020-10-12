import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AcquirerDetailsComponent } from './acquirer-details/acquirer-details.component';
import { AcquirerFeeSharingComponent } from './acquirer-fee-sharing/acquirer-fee-sharing.component';
import { AcquirerRoutesComponent } from './acquirer-routes/acquirer-routes.component';
import { ManageAcquirerComponent } from './manage-acquirer/manage-acquirer.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
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
            component: AcquirerRoutesComponent
          }
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ManageAcquirerRoutingModule {}
