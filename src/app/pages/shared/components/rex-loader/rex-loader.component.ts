// tslint:disable
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-rex-loader',
  templateUrl: './rex-loader.component.html',
  styleUrls: ['./rex-loader.component.scss']
})
export class RexLoaderComponent implements OnInit {

  @Input() isPushed: boolean;

  constructor() { }

  ngOnInit() {
  }

}
