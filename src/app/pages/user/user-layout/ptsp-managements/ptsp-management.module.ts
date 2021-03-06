import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PtspsComponent } from './ptsps/ptsps.component';
import { UpdatePtspComponent } from './update-ptsp/update-ptsp.component';
import { PtspDetailsComponent } from './ptsp-details/ptsp-details.component';
import { PtspManagementRoutingModule } from './ptsp-management-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/pages/shared/modules/shared.module';

@NgModule({
  declarations: [PtspsComponent, UpdatePtspComponent, PtspDetailsComponent],
  imports: [
    CommonModule,
    PtspManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class PtspManagementModule {}
