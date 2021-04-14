import { Component, OnInit } from '@angular/core';
import { Router, Event, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StorageService } from 'src/app/core/helpers/storage.service';

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
  permissions: any;
  currentUrl: string;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private acquirerService: AcquirerService,
    private alertService: AlertService,
    private storageService: StorageService
  ) {
    this.router.events.subscribe((val) => {
      this.currentUrl = location.path();
    });
  }

  ngOnInit() {
    this.acquirerId = this.route.snapshot.params.id;
    console.log('this is acquirer ID', this.acquirerId);

    this.getAcquirer();

    this.getPermissions();
  }

  backClicked() {
    this.location.back();
  }

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
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
