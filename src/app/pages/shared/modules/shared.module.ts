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

@NgModule({
  declarations: [TopNavigationComponent, SideNavigationComponent, RexPaginationComponent],
  exports: [SideNavigationComponent, TopNavigationComponent, RexPaginationComponent],
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  providers: [Config, AlertService, PaginationService],
})
export class SharedModule {}
