import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettlementDetailsRoutingModule } from './settlements-details-routing.module';
import { ReportComponent } from './report/report.component';
import { SettlementsComponent } from './settlements/settlements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ReportComponent, SettlementsComponent],
  imports: [
    CommonModule,
    SettlementDetailsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class SettlementDetailsModule {}
