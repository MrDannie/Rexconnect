import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideNavigationComponent } from '../components/side-navigation/side-navigation.component';
import { TopNavigationComponent } from '../components/top-navigation/top-navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TopNavigationComponent, SideNavigationComponent],
  imports: [CommonModule, RouterModule],
  exports: [SideNavigationComponent, TopNavigationComponent],
})
export class SharedModule {}
