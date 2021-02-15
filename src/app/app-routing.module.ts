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
import { ViewTransactionsGuard } from './core/guards/view-transactions.guard';
import { ManageUsersGuard } from './core/guards/manage-users.guard';
import { ManageMerchantGuard } from './core/guards/manage-merchant.guard';
import { ViewAllTerminalGuard } from './core/guards/view-all-terminal.guard';
import { ViewPtspsGuard } from './core/guards/view-ptsps.guard';
import { ViewClientsGuard } from './core/guards/view-clients.guard';
import { ManageStationsGuard } from './core/guards/Manage-stations.guard';
import { ManageRoutingGuard } from './core/guards/Manage-routing.guard';
import { ManageClientsGuard } from './core/guards/Manage-clients.guard';
import { RecoverPasswordComponent } from './pages/landing-page/authentication/recover-password/recover-password.component';

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
    path: 'recover-password',
    component: RecoverPasswordComponent,
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
        canActivate: [ViewTransactionsGuard],
      },
      {
        path: 'audit-log',
        component: AuditLogsComponent,
      },
      {
        path: 'all-users',
        canActivate: [ManageUsersGuard],
        loadChildren:
          './pages/user/user-layout/user-management/user-management.module#UserManagementModule',
      },
      {
        path: 'ptsp',
        canActivate: [ViewPtspsGuard],
        loadChildren:
          './pages/user/user-layout/ptsp-managements/ptsp-management.module#PtspManagementModule',
      },
      {
        path: 'terminals',
        canActivate: [ViewAllTerminalGuard],
        loadChildren:
          './pages/user/user-layout/manage-terminal/manage-terminal.module#ManageTerminalModule',
      },
      {
        path: 'merchants',
        canActivate: [ManageMerchantGuard],
        loadChildren:
          './pages/user/user-layout/manage-merchant/manage-merchant.module#ManageMerchantModule',
      },
      {
        path: 'acquirers',
        canActivate: [ManageClientsGuard],
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
        canActivate: [ManageStationsGuard],
        loadChildren:
          './pages/user/user-layout/manage-stations/manage-stations.module#ManageStationsModule',
      },
      {
        path: 'routes',
        canActivate: [ManageRoutingGuard],
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
export class AppRoutingModule {}
