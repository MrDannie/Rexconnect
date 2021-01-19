import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesComponent } from './routes/routes.component';
import { ManageRoutesRoutingModule } from './manage-routes-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutesDetailsComponent } from './routes-details/routes-details.component';
import { EditRoutesComponent } from './edit-routes/edit-routes.component';

@NgModule({
  declarations: [RoutesComponent, RoutesDetailsComponent, EditRoutesComponent],
  imports: [
    CommonModule,
    ManageRoutesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ManageRoutesModule {}
