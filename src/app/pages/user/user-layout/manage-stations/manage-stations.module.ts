import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStationsRoutingModule } from './manage-stations-routing.module';
import { StationsDetailsComponent } from './stations-details/stations-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StationsComponent } from './stations/stations.component';
import { UpdateStationComponent } from './update-station/update-station.component';
import { SharedModule } from 'src/app/pages/shared/modules/shared.module';

@NgModule({
  declarations: [
    StationsDetailsComponent,
    StationsComponent,
    UpdateStationComponent,
  ],
  imports: [
    CommonModule,
    ManageStationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class ManageStationsModule {}
