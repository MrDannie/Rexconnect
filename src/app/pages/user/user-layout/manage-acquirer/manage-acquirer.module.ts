import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAcquirerRoutingModule } from './manage-acquirer-routing.module';
import { ManageAcquirerComponent } from './manage-acquirer/manage-acquirer.component';
import { AcquirerDetailsComponent } from './acquirer-details/acquirer-details.component';
import { AcquirerRoutesComponent } from './acquirer-routes/acquirer-routes.component';
import { AcquirerFeeSharingComponent } from './acquirer-fee-sharing/acquirer-fee-sharing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcquirerComponent } from './acquirer/acquirer.component';
import { AcquirerRouteDetailsComponent } from './acquirer-route-details/acquirer-route-details.component';
import { AddRoutesComponent } from '../manage-routes/add-routes/add-routes.component';
import { AddAcquirerComponent } from './add-acquirer/add-acquirer.component';
import { SharedModule } from 'src/app/pages/shared/modules/shared.module';

@NgModule({
  declarations: [
    ManageAcquirerComponent,
    AcquirerDetailsComponent,
    AcquirerRoutesComponent,
    AcquirerFeeSharingComponent,
    AcquirerComponent,
    AcquirerRouteDetailsComponent,
    AddRoutesComponent,
    AddAcquirerComponent,
  ],
  imports: [
    CommonModule,
    ManageAcquirerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class ManageAcquirerModule {}
