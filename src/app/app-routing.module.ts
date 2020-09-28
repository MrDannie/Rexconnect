import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/landing-page/authentication/sign-in/sign-in.component';
import { AcquirerComponent } from './pages/user/user-layout/acquirer/acquirer.component';
import { AuditLogsComponent } from './pages/user/user-layout/audit-logs/audit-logs.component';
import { DashboardComponent } from './pages/user/user-layout/dashboard/dashboard.component';
import { MerchantsComponent } from './pages/user/user-layout/merchants/merchants.component';
import { SettlementsComponent } from './pages/user/user-layout/settlements/settlements.component';
import { StationsComponent } from './pages/user/user-layout/stations/stations.component';
import { TerminalsComponent } from './pages/user/user-layout/terminals/terminals.component';
import { TransactionsComponent } from './pages/user/user-layout/transactions/transactions.component';
import { UserLayoutComponent } from './pages/user/user-layout/user-layout.component';

const routes: Routes = [
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
        path: 'users',
        loadChildren:
          './pages/user/user-layout/user-management/user-management.module#UserManagementModule',
      },
      {
        path: 'terminals',
        component: TerminalsComponent,
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
    ],
  },
  {
    path: 'sign-in',
    component: SignInComponent,
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
