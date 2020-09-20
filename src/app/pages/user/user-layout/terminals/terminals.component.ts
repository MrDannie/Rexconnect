import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.scss'],
})
export class TerminalsComponent implements OnInit {
  showFilter: boolean;

  constructor() {
    this.showFilter = false;
  }

  ngOnInit() {}

  reset() {}

  generateCSV() {}
}
