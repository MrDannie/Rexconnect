import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-manage-terminal',
  templateUrl: './manage-terminal.component.html',
  styleUrls: ['./manage-terminal.component.scss']
})
export class ManageTerminalComponent implements OnInit {

  terminalId: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.terminalId = params.id;
    })
  }

}
