import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProfileRoutingModule } from './manage-profile-routing.module';
import { PersonalDetailsComponent } from './personal-details/personal-details.component';
import { PasswordManagementComponent } from './password-management/password-management.component';
import { SharedModule } from 'src/app/pages/shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';

@NgModule({
  declarations: [PersonalDetailsComponent, PasswordManagementComponent, ProfileComponent, AdminSettingsComponent],
  imports: [
    CommonModule,
    ManageProfileRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ManageProfileModule {}
