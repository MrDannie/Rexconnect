import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { StationsService } from '../stations.service';
import { MaskSensitiveKeys } from 'src/app/pages/shared/pipes/mask-sensitve-key.pipe';

declare var $: any;

@Component({
  selector: 'app-stations-details',
  templateUrl: './stations-details.component.html',
  styleUrls: ['./stations-details.component.scss'],
  providers: [MaskSensitiveKeys],
})
export class StationsDetailsComponent implements OnInit {
  showFilter: boolean;
  private route$: Subscription;

  editStationForm: any;
  stationId: any;
  stationDetails: any;
  isLoading = true;
  isDisabling = false;
  isEnabling = false;
  permissions: any;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private stationsService: StationsService,
    private alertService: AlertService,
    private storageService: StorageService,
    private maskSensitiveKeys: MaskSensitiveKeys
  ) {
    this.showFilter = false;
  }

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
  }

  ngOnInit() {
    this.route$ = this.route.params.subscribe((params: Params) => {
      this.stationId = params['id'];
      console.log(this.stationId);
    });
    this.getStationDetails();

    this.getPermissions();
  }

  getStationDetails() {
    this.stationsService.getStation(this.stationId).subscribe(
      (res) => {
        console.log(res);
        // res['data'].authPassword = this.maskSensitiveKeys.transform(
        //   res['data'].authPassword,
        //   5
        // );
        // res['data'].map((trx) => {
        //   trx.pan = this.maskSensitiveKeys.transform(trx.pan, 3);
        // });
        this.stationDetails = res['data'];
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error);
        this.isLoading = false;
      }
    );
  }

  disableStation() {
    this.isDisabling = true;
    this.stationsService.disableStation(this.stationId).subscribe(
      (res) => {
        console.log(res);
        $('#confirmationModal').modal('hide');

        this.alertService.success('Station disabled successfully');
        this.getStationDetails();
        this.isDisabling = false;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error);
        this.isDisabling = false;
      }
    );
  }

  enableStation() {
    this.isEnabling = true;
    this.stationsService.enableStation(this.stationId).subscribe(
      (res) => {
        console.log(res);
        this.alertService.success('Station enabled successfully');
        this.getStationDetails();
        this.isEnabling = false;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error);
        this.isEnabling = false;
      }
    );
  }
}
