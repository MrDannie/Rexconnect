import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettlementDetailsRoutingModule } from './settlements-details-routing.module';
import { ReportComponent } from './report/report.component';

@NgModule({
  declarations: [ReportComponent],
  imports: [
    CommonModule,
    SettlementDetailsRoutingModule
  ]
})
export class SettlementDetailsModule { }
