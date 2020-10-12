import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';
import { SettlementsComponent } from './settlements/settlements.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SettlementsComponent,
      },

      {
        path: ':id/reports',
        component: ReportComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SettlementDetailsRoutingModule {}
