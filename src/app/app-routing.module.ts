import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './pages/landing-page/authentication/sign-in/sign-in.component';
import { AcquirerComponent } from './pages/user/user-layout/acquirer/acquirer.component';
import { AuditLogsComponent } from './pages/user/user-layout/audit-logs/audit-logs.component';
import { DashboardComponent } from './pages/user/user-layout/dashboard/dashboard.component';
import { MerchantsComponent } from './pages/user/user-layout/merchants/merchants.component';
import { SettlementsComponent } from './pages/user/user-layout/settlements/settlements.component';
import { StationsComponent } from './pages/user/user-layout/stations/stations.component';
import { ManageTerminalComponent } from './pages/user/user-layout/terminals/manage-terminal/manage-terminal.component';
import { TerminalDetailsComponent } from './pages/user/user-layout/terminals/terminal-details/terminal-details.component';
import { TerminalTransactionsComponent } from './pages/user/user-layout/terminals/terminal-transactions/terminal-transactions.component';
import { TerminalsComponent } from './pages/user/user-layout/terminals/terminals.component';
import { TransactionsComponent } from './pages/user/user-layout/transactions/transactions.component';
import { UserLayoutComponent } from './pages/user/user-layout/user-layout.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'terminals',
        component: TerminalsComponent,
      },
      {
        path: 'manage-terminal/:id',
        component: ManageTerminalComponent,
        children: [
          {
            path: '',
            redirectTo: 'terminal-details',
            pathMatch: 'full',
          },
          {
            path: 'terminal-details',
            component: TerminalDetailsComponent,
          },
          {
            path: 'terminal-transaction',
            component: TerminalTransactionsComponent,
          },
        ],
      },
      {
        path: 'users',
        loadChildren: () =>
          import(
            './pages/user/user-layout/user-management/user-management.module'
          ).then((m) => m.UserManagementModule),
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
