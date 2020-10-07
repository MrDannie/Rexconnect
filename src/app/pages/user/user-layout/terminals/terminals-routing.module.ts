import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageTerminalComponent } from './manage-terminal/manage-terminal.component';
import { TerminalDetailsComponent } from './terminal-details/terminal-details.component';
import { TerminalTransactionsComponent } from './terminal-transactions/terminal-transactions.component';
import { TerminalsComponent } from './terminals.component';

@NgModule({
  imports: [
    RouterModule.forChild([
     
      // {
      //   path: 'terminals',
      //   component: TerminalsComponent,
      //   children: [
      //     {
      //       path: '',
      //       component: TerminalsComponent,
      //     },
      //     {
      //       path: ':id',
      //       component: ManageTerminalComponent,
      //       children: [
      //         {
      //           path: '',
      //           redirectTo: 'terminal-details',
      //           pathMatch: 'full',
      //         },
      //         {
      //           path: 'terminal-details',
      //           component: TerminalDetailsComponent,
      //         },
      //         {
      //           path: 'terminal-transaction',
      //           component: TerminalTransactionsComponent,
      //         },
      //       ],
      //     },
      //   ],
      // },
    ]),
  ],
  exports: [RouterModule],
})
export class TerminalsRoutingModule {}
