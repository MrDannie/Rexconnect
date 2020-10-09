import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StationsDetailsComponent } from './stations-details/stations-details.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'station-details',
        pathMatch: 'full',
      },
      {
        path: 'station-details',
        component: StationsDetailsComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ManageStationsRoutingModule {}
