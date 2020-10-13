import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationsDetailsComponent } from './stations-details/stations-details.component';
import { StationsComponent } from './stations/stations.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StationsComponent,
      },
      {
        path: ':id/station-details',
        component: StationsDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ManageStationsRoutingModule {}
