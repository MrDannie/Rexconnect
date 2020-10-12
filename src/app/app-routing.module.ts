import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/landing-page/authentication/sign-in/sign-in.component';
import { AcquirerComponent } from './pages/user/user-layout/acquirer/acquirer.component';
import { AuditLogsComponent } from './pages/user/user-layout/audit-logs/audit-logs.component';
import { DashboardComponent } from './pages/user/user-layout/dashboard/dashboard.component';
import { ManageMerchantModule } from './pages/user/user-layout/manage-merchant/manage-merchant.module';
import { ManageAcquirerModule } from './pages/user/user-layout/manage-acquirer/manage-acquirer.module';
import { SettlementDetailsModule } from './pages/user/user-layout/settlement-details/settlements-details.module';

import { MerchantsComponent } from './pages/user/user-layout/merchants/merchants.component';
import { SettlementsComponent } from './pages/user/user-layout/settlements/settlements.component';
import { StationsComponent } from './pages/user/user-layout/stations/stations.component';
import { TerminalsComponent } from './pages/user/user-layout/terminals/terminals.component';
import { TransactionsComponent } from './pages/user/user-layout/transactions/transactions.component';
import { UserLayoutComponent } from './pages/user/user-layout/user-layout.component';
import { ManageUserComponent } from './pages/user/user-layout/user-management/manage-user/manage-user.component';
import { RoleManagementComponent } from './pages/user/user-layout/user-management/role-management/role-management.component';
import { ManageStationsModule } from './pages/user/user-layout/manage-stations/manage-stations.module';
import { ManageTerminalModule } from './pages/user/user-layout/manage-terminal/manage-terminal.module';

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
      {
        path: 'terminals',
        component: TerminalsComponent,
      },

      {
        path: 'all-users',
        component: ManageUserComponent,
      },
      {
        path: 'manage-user-roles',
        component: RoleManagementComponent,
      },
      {
        path: 'merchants',
        component: MerchantsComponent,
      },
      {
        path: 'acquirer',
        component: AcquirerComponent,
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
        path: 'settlements',
        component: SettlementsComponent,
      },
      {
        path: 'audit-log',
        component: AuditLogsComponent,
      },
      {
        path: 'manage-terminal/:id',
        loadChildren:
          './pages/user/user-layout/manage-terminal/manage-terminal.module#ManageTerminalModule',
      },
      {
        path: 'manage-merchant/:id',
        loadChildren:
          './pages/user/user-layout/manage-merchant/manage-merchant.module#ManageMerchantModule',
      },
      {
        path: 'manage-acquirer/:id',
        loadChildren:
          './pages/user/user-layout/manage-acquirer/manage-acquirer.module#ManageAcquirerModule',
      },
      {
        path: 'settlement-details/:id',
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
