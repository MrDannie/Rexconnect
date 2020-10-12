import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/landing-page/authentication/sign-in/sign-in.component';
import { AuditLogsComponent } from './pages/user/user-layout/audit-logs/audit-logs.component';
import { DashboardComponent } from './pages/user/user-layout/dashboard/dashboard.component';
import { ManageMerchantModule } from './pages/user/user-layout/manage-merchant/manage-merchant.module';
import { ManageAcquirerModule } from './pages/user/user-layout/manage-acquirer/manage-acquirer.module';
import { SettlementDetailsModule } from './pages/user/user-layout/settlement-details/settlements-details.module';

import { StationsComponent } from './pages/user/user-layout/stations/stations.component';
import { TransactionsComponent } from './pages/user/user-layout/transactions/transactions.component';
import { UserLayoutComponent } from './pages/user/user-layout/user-layout.component';
import { ManageUserComponent } from './pages/user/user-layout/user-management/manage-user/manage-user.component';
import { RoleManagementComponent } from './pages/user/user-layout/user-management/role-management/role-management.component';
import { ManageStationsModule } from './pages/user/user-layout/manage-stations/manage-stations.module';
import { ManageTerminalModule } from './pages/user/user-layout/manage-terminal/manage-terminal.module';
import { UserManagementModule } from './pages/user/user-layout/user-management/user-management.module';

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
      // {
      //   path: 'terminals',
      //   component: TerminalsComponent,
      // },

      // {
      //   path: 'all-users',
      //   component: ManageUserComponent,
      // },
      // {
      //   path: 'manage-user-roles',
      //   component: RoleManagementComponent,
      // },
      {
        path: 'all-users',
        loadChildren:
          './pages/user/user-layout/user-management/user-management.module#UserManagementModule',
      },
      {
        path: 'stations',
        component: StationsComponent,
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
        path: 'manage-station/:id',
        loadChildren:
          './pages/user/user-layout/manage-stations/manage-stations.module#ManageStationsModule',
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
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
