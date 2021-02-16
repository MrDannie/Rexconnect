import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';

declare var $: any;

@Component({
  selector: 'app-routes-details',
  templateUrl: './routes-details.component.html',
  styleUrls: ['./routes-details.component.scss'],
})
export class RoutesDetailsComponent implements OnInit {
  editAcquirerForm: FormGroup;
  routing: any;
  routeConfigs: any;
  defaultDestinationStaion: string;
  routeId: number;
  useDefaultValue: any;
  routeStatus: string;
  disablingRoute: boolean;
  routeName: string;
  createdAt: any;
  permissions: any;

  constructor(
    private routingCompService: RouteComponentService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.routeId = this.route.snapshot.params.id;
    this.routingCompService
      .getSingleRoute(this.routeId)
      .subscribe((response) => {
        this.createdAt = response.data.created_at;
        let parsedData = JSON.parse(response.data.rule_config);
        response.data.rule_config = parsedData;
        this.routing = parsedData;
        this.routeConfigs = this.routing.ruleconfig;
        this.defaultDestinationStaion = response.data.default_ds;
        this.useDefaultValue = response.data.use_default;
        this.routeName = 'Default Route';
      }),
      (error) => {
        console.log(error);
        this.alertService.error(error);
      };

    this.getPermissions();
  }

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
  }

  disableRoute(routeId) {
    console.log('ROUTE ID TO DELETE', routeId);
    this.routingCompService.disableRoute(routeId).subscribe(
      (response) => {
        console.log('DISABLED RESPONSE', response);
        this.alertService.success('Acquirer Disabled Successfully');
        this.disablingRoute = false;
        $('#disableAcquirertModal').modal('hide');
        this.routeStatus = 'INACTIVE';
      },
      (error) => {
        this.alertService.error(error);
        this.disablingRoute = false;
      }
    );
  }

  enableRoute() {
    this.routingCompService.enableRoute(this.routeId).subscribe(
      (response) => {
        this.alertService.success('Acquirer Enabled Successfully');
        this.routeStatus = 'ACTIVE';
      },
      (error) => {
        this.alertService.error(error);
      }
    );
  }
}
