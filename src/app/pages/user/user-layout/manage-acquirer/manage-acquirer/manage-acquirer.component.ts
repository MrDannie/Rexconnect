import { Component, OnInit } from '@angular/core';
import { Router, Event, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';
import { AlertService } from 'src/app/core/alert/alert.service';

declare var $: any;

@Component({
  selector: 'app-manage-acquirer',
  templateUrl: './manage-acquirer.component.html',
  styleUrls: ['./manage-acquirer.component.scss'],
})
export class ManageAcquirerComponent implements OnInit {
  notRouteComponent: boolean = true;
  acquirerId;
  acquirerName: any;
  disablingAcquirer: boolean = false;
  acquirerStatus: string = 'Active';
  createdAt: any;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private acquirerService: AcquirerService,
    private alertService: AlertService
  ) {
    this.router.events.subscribe((val) => {
      const currentUrl = location.path();
      this.notRouteComponent = currentUrl.includes('acquirer-routes')
        ? false
        : true;
    });
  }

  ngOnInit() {
    this.acquirerId = this.route.snapshot.params.id;
    console.log('this is acquirer ID', this.acquirerId);

    this.getAcquirer();
  }
  getAcquirer() {
    this.acquirerService
      .getSingleAcquirer(this.acquirerId)
      .subscribe((response) => {
        console.log('acquirer Gotten', response);
        this.acquirerName = response['data']['clientName'];
        this.acquirerStatus = response['data']['status'];
        this.createdAt = response['data']['createdAt'];
      });
  }

  disableAcquirer(acquirerId) {
    this.disablingAcquirer = true;
    this.acquirerService.disableAcquirer(acquirerId).subscribe(
      (response) => {
        console.log('DISABLED RESPONSE', response);
        this.alertService.success('Acquirer Disabled Successfully');
        this.disablingAcquirer = false;
        $('#disableAcquirertModal').modal('hide');
        this.acquirerStatus = 'INACTIVE';
      },
      (error) => {
        this.alertService.error(error);
        this.disablingAcquirer = false;
      }
    );
  }

  enableAcquirer() {
    this.acquirerService.enableAcquirer(this.acquirerId).subscribe(
      (response) => {
        this.alertService.success('Acquirer Enabled Successfully');
        this.acquirerStatus = 'ACTIVE';
      },
      (error) => {
        this.alertService.error(error);
      }
    );
  }
}
