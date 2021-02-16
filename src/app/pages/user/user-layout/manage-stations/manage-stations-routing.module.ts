import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationsDetailsComponent } from './stations-details/stations-details.component';
import { StationsComponent } from './stations/stations.component';
import { UpdateStationComponent } from './update-station/update-station.component';

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
      {
        path: 'update-station/:id',
        component: UpdateStationComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ManageStationsRoutingModule {}
