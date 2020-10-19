import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationComponent } from '../components/side-navigation/side-navigation.component';
import { TopNavigationComponent } from '../components/top-navigation/top-navigation.component';
import { RouterModule } from '@angular/router';
import { Config } from 'src/app/core/Config';
import { AlertService } from 'src/app/core/alert/alert.service';
import { SanitizePermissionsPipe } from '../pipes/sanitize-permissions.pipe';

@NgModule({
  declarations: [
    TopNavigationComponent,
    SideNavigationComponent,
    SanitizePermissionsPipe,
  ],
  imports: [CommonModule, RouterModule],
  providers: [Config, AlertService, SanitizePermissionsPipe],
  exports: [
    SideNavigationComponent,
    TopNavigationComponent,
    SanitizePermissionsPipe,
  ],
})
export class SharedModule {}
