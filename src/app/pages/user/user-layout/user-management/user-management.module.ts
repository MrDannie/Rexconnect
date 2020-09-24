import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { EditUserComponent } from './edit-user/edit-user.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { SharedModule } from '../../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    EditUserComponent,
    ManageUserComponent,
    RoleManagementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    UserManagementRoutingModule,
  ],
})
export class UserManagementModule {}
