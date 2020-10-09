import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminal-transactions',
  templateUrl: './terminal-transactions.component.html',
  styleUrls: ['./terminal-transactions.component.scss']
})
export class TerminalTransactionsComponent implements OnInit {
  ngForArray: number[];

  constructor() { }

  ngOnInit() {
    this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11]
  }

}
