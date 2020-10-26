import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordManagementComponent } from './password-management/password-management.component';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        children: [
          {
            path: '',
            redirectTo: 'personal-details',
            pathMatch: 'full',
          },
          {
            path: 'personal-details',
            component: PersonalDetailsComponent,
          },
          {
            path: 'manage-password',
            component: PasswordManagementComponent,
          },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class ManageProfileRoutingModule {}
