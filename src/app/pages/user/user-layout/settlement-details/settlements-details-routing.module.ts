import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportComponent } from './report/report.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'reports',
        pathMatch: 'full',
      },
      {
        path: 'reports',
        component: ReportComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SettlementDetailsRoutingModule {}
