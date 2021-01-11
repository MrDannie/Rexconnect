import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/landing-page/authentication/sign-in/sign-in.component';
import { AuditLogsComponent } from './pages/user/user-layout/audit-logs/audit-logs.component';
import { DashboardComponent } from './pages/user/user-layout/dashboard/dashboard.component';
import { ManageMerchantModule } from './pages/user/user-layout/manage-merchant/manage-merchant.module';
import { ManageAcquirerModule } from './pages/user/user-layout/manage-acquirer/manage-acquirer.module';
import { SettlementDetailsModule } from './pages/user/user-layout/settlement-details/settlements-details.module';
import { TransactionsComponent } from './pages/user/user-layout/transactions/transactions.component';
import { UserLayoutComponent } from './pages/user/user-layout/user-layout.component';
import { ManageUserComponent } from './pages/user/user-layout/user-management/manage-user/manage-user.component';
import { RoleManagementComponent } from './pages/user/user-layout/user-management/role-management/role-management.component';
import { ManageStationsModule } from './pages/user/user-layout/manage-stations/manage-stations.module';
import { ManageRoutesModule } from './pages/user/user-layout/manage-routes/manage-routes.module';

import { ManageTerminalModule } from './pages/user/user-layout/manage-terminal/manage-terminal.module';
import { UserManagementModule } from './pages/user/user-layout/user-management/user-management.module';
import { ManageProfileModule } from './pages/user/user-layout/manage-profile/manage-profile.module';
import { LoginGuard } from './core/guards/login.guard';
import { PtspComponent } from './pages/user/user-layout/ptsp/ptsp.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'sign-in',
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'user',
    component: UserLayoutComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
      },
      {
        path: 'audit-log',
        component: AuditLogsComponent,
      },
      {
        path: 'ptsp',
        component: PtspComponent
      },
      {
        path: 'all-users',
        loadChildren:
          './pages/user/user-layout/user-management/user-management.module#UserManagementModule',
      },
      {
        path: 'terminals',
        loadChildren:
          './pages/user/user-layout/manage-terminal/manage-terminal.module#ManageTerminalModule',
      },
      {
        path: 'merchants',
        loadChildren:
          './pages/user/user-layout/manage-merchant/manage-merchant.module#ManageMerchantModule',
      },
      {
        path: 'acquirers',
        loadChildren:
          './pages/user/user-layout/manage-acquirer/manage-acquirer.module#ManageAcquirerModule',
      },
      {
        path: 'settlements',
        loadChildren:
          './pages/user/user-layout/settlement-details/settlements-details.module#SettlementDetailsModule',
      },
      {
        path: 'stations',
        loadChildren:
          './pages/user/user-layout/manage-stations/manage-stations.module#ManageStationsModule',
      },
      {
        path: 'routes',
        loadChildren:
          './pages/user/user-layout/manage-routes/manage-routes.module#ManageRoutesModule',
      },
      {
        path: 'profile',
        loadChildren:
          './pages/user/user-layout/manage-profile/manage-profile.module#ManageProfileModule',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      paramsInheritanceStrategy: 'always',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
