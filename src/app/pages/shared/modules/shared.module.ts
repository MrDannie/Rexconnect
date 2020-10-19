import { RexLoaderComponent } from './../components/rex-loader/rex-loader.component';
// tslint:disable
import { PaginationService } from 'src/app/core/pagination.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RexPaginationComponent } from './../components/rex-pagination/rex-pagination.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertService } from 'src/app/core/alert/alert.service';
import { Config } from 'src/app/core/Config';

import { RouterModule } from '@angular/router';
import { SideNavigationComponent } from '../components/side-navigation/side-navigation.component';
import { TopNavigationComponent } from '../components/top-navigation/top-navigation.component';
import { SanitizePermissionsPipe } from '../pipes/sanitize-permissions.pipe';

@NgModule({
  declarations: [
    TopNavigationComponent,
    SideNavigationComponent,
    SanitizePermissionsPipe,
  ],

  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [Config, AlertService, PaginationService],
  exports: [
    SideNavigationComponent,
    TopNavigationComponent,
    SanitizePermissionsPipe,
    RexPaginationComponent,
    RexLoaderComponent,
  ],
})
export class SharedModule {}
