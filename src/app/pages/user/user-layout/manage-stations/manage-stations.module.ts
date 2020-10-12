import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStationsRoutingModule } from './manage-stations-routing.module';
import { StationsDetailsComponent } from './stations-details/stations-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StationsComponent } from './stations/stations.component';

@NgModule({
  declarations: [StationsDetailsComponent, StationsComponent],
  imports: [
    CommonModule,
    ManageStationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ManageStationsModule {}
