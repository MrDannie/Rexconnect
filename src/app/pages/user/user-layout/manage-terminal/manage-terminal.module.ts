import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageTerminalRoutingModule } from './manage-terminal-routing.module';
import { TerminalDetailsComponent } from './terminal-details/terminal-details.component';
import { TerminalTransactionsComponent } from './terminal-transactions/terminal-transactions.component';
import { ManageTerminalComponent } from './manage-terminal/manage-terminal.component';

@NgModule({
  declarations: [
    TerminalDetailsComponent,
    TerminalTransactionsComponent,
    ManageTerminalComponent,
  ],
  imports: [CommonModule, ManageTerminalRoutingModule],
})
export class ManageTerminalModule {}
