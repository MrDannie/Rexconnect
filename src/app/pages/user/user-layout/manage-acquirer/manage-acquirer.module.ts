import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAcquirerRoutingModule } from './manage-acquirer-routing.module';
import { ManageAcquirerComponent } from './manage-acquirer/manage-acquirer.component';
import { AcquirerDetailsComponent } from './acquirer-details/acquirer-details.component';
import { AcquirerRoutesComponent } from './acquirer-routes/acquirer-routes.component';
import { AcquirerFeeSharingComponent } from './acquirer-fee-sharing/acquirer-fee-sharing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManageAcquirerComponent,
    AcquirerDetailsComponent,
    AcquirerRoutesComponent,
    AcquirerFeeSharingComponent,
  ],
  imports: [
    CommonModule,
    ManageAcquirerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ManageAcquirerModule {}
