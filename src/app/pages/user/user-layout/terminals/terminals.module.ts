import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TerminalsRoutingModule } from './terminals-routing.module';
import { TerminalsComponent } from './terminals.component';
import { TerminalDetailsComponent } from './terminal-details/terminal-details.component';
import { TerminalTransactionsComponent } from './terminal-transactions/terminal-transactions.component';
import { ManageTerminalComponent } from './manage-terminal/manage-terminal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TerminalsComponent,
    TerminalDetailsComponent,
    TerminalTransactionsComponent,
    ManageTerminalComponent,
  ],
  imports: [
    CommonModule,
    TerminalsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class TerminalsModule {}
