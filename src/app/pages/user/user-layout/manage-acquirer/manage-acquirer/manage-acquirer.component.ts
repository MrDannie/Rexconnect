import { Component, OnInit } from '@angular/core';
import { Router, Event } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-acquirer',
  templateUrl: './manage-acquirer.component.html',
  styleUrls: ['./manage-acquirer.component.scss']
})
export class ManageAcquirerComponent implements OnInit {
  notRouteComponent: boolean = true

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((val) => {
      const currentUrl = location.path()
      this.notRouteComponent = (currentUrl.includes('acquirer-routes')) ? false : true
    })
  }


  ngOnInit() {
  }



}
