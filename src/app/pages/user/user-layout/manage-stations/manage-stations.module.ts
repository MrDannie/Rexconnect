import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageStationsRoutingModule } from './manage-stations-routing.module';
import { StationsDetailsComponent } from './stations-details/stations-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [StationsDetailsComponent],
  imports: [
    CommonModule,
    ManageStationsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ManageStationsModule {}
