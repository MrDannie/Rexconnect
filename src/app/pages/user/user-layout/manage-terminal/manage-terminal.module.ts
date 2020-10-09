import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageTerminalRoutingModule } from './manage-terminal-routing.module';
import { TerminalDetailsComponent } from './terminal-details/terminal-details.component';
import { TerminalTransactionsComponent } from './terminal-transactions/terminal-transactions.component';
import { ManageTerminalComponent } from './manage-terminal/manage-terminal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TerminalsComponent } from './terminals/terminals.component';

@NgModule({
  declarations: [
    TerminalDetailsComponent,
    TerminalTransactionsComponent,
    ManageTerminalComponent,
    TerminalsComponent,
  ],
  imports: [
    CommonModule,
    ManageTerminalRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class ManageTerminalModule {}
