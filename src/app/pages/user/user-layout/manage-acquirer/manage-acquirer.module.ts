import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAcquirerRoutingModule } from './manage-acquirer-routing.module';
import { ManageAcquirerComponent } from './manage-acquirer/manage-acquirer.component';
import { AcquirerDetailsComponent } from './acquirer-details/acquirer-details.component';
import { AcquirerRoutesComponent } from './acquirer-routes/acquirer-routes.component';
import { AcquirerFeeSharingComponent } from './acquirer-fee-sharing/acquirer-fee-sharing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AcquirerComponent } from './acquirer/acquirer.component';
import { AddRoutesComponent } from '../manage-routes/add-routes/add-routes.component';
import { AddAcquirerComponent } from './add-acquirer/add-acquirer.component';
import { SharedModule } from 'src/app/pages/shared/modules/shared.module';
import { AcquirerPtspsComponent } from './acquirer-ptsps/acquirer-ptsps.component';
import { UpdateAcquirerComponent } from './update-acquirer/update-acquirer.component';
import { AcquirerUsersComponent } from './acquirer-users/acquirer-users.component';
import { AcquirerMerchantsComponent } from './acquirer-merchants/acquirer-merchants.component';
import { AcquirerMerchantDetailsComponent } from './acquirer-merchants/acquirer-merchant-details/acquirer-merchant-details.component';
import { AcquirerMerchantTransactionsComponent } from './acquirer-merchants/acquirer-merchant-transactions/acquirer-merchant-transactions.component';
import { AcquirerMerchantTerminalsComponent } from './acquirer-merchants/acquirer-merchant-terminals/acquirer-merchant-terminals.component';
import { AcquirerTransactionsComponent } from './acquirer-transactions/acquirer-transactions.component';
import { AcquirerMerchantTerminalDetailsComponent } from './acquirer-merchants/acquirer-merchant-terminal-details/acquirer-merchant-terminal-details.component';

@NgModule({
  declarations: [
    ManageAcquirerComponent,
    AcquirerDetailsComponent,
    AcquirerRoutesComponent,
    AcquirerFeeSharingComponent,
    AcquirerComponent,
    AcquirerRoutesComponent,
    AddRoutesComponent,
    AddAcquirerComponent,
    AcquirerPtspsComponent,
    UpdateAcquirerComponent,
    AcquirerUsersComponent,

    AcquirerMerchantsComponent,

    AcquirerMerchantDetailsComponent,

    AcquirerMerchantTransactionsComponent,

    AcquirerMerchantTerminalsComponent,

    AcquirerTransactionsComponent,

    AcquirerMerchantTerminalDetailsComponent,
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
