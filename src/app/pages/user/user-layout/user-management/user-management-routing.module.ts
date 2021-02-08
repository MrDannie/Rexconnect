import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageUserRoleGuardGuard } from 'src/app/core/guards/manage-user-role-guard.guard';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { RoleManagementComponent } from './role-management/role-management.component';

// const routes: Routes = [
//   { path: '', redirectTo: 'all-users' },
//   { path: 'all-users', component: ManageUserComponent },
//   { path: 'manage-roles', component: RoleManagementComponent },
//   { path: 'edit-user/:id', component: EditUserComponent },
// ];

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: ManageUserComponent,
      },
      {
        path: 'manage-user-roles',
        component: RoleManagementComponent,
        canActivate: [ManageUserRoleGuardGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
