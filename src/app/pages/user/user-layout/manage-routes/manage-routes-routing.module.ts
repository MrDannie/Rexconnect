import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoutesComponent } from './add-routes/add-routes.component';
import { EditRoutesComponent } from './edit-routes/edit-routes.component';
import { RoutesDetailsComponent } from './routes-details/routes-details.component';

import { RoutesComponent } from './routes/routes.component';

const routes: Routes = [{ path: 'routePath', component: RoutesComponent }];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: RoutesComponent,
      },
      {
        path: 'route-details/:id',
        component: RoutesDetailsComponent,
      },
      {
        path: 'add-routes',
        component: AddRoutesComponent,
      },
      {
        path: 'edit-routes/:id',
        component: EditRoutesComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ManageRoutesRoutingModule {}
