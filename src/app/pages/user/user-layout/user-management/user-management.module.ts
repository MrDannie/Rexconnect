import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { RoleManagementComponent } from './role-management/role-management.component';

@NgModule({
  declarations: [EditUserComponent, ManageUserComponent, RoleManagementComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
