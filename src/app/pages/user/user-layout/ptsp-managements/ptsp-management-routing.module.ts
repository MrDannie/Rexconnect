import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PtspDetailsComponent } from './ptsp-details/ptsp-details.component';
import { PtspsComponent } from './ptsps/ptsps.component';
import { UpdatePtspComponent } from './update-ptsp/update-ptsp.component';


const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: PtspsComponent,
      },
      {
        path: ':id/ptsp-details',
        component: PtspDetailsComponent,
      },
      {
        path: 'update-ptsp/:id',
        component: UpdatePtspComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class PtspManagementRoutingModule {}