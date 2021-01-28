import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StationsService } from '../stations.service';

@Component({
  selector: 'app-update-station',
  templateUrl: './update-station.component.html',
  styleUrls: ['./update-station.component.scss'],
})
export class UpdateStationComponent implements OnInit {
  public showFilter: boolean;
  private route$: Subscription;

  public editStationForm: any;
  public stationId: any;
  public stationDetails: any;
  public isLoading = true;
  public isUpdating = false;
  public isEnabling = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router, private stationsService: StationsService, private alertService: AlertService) {
    this.showFilter = false;

    this.initializeForm();
  }

  public ngOnInit() {
    this.route$ = this.route.params.subscribe((params: Params) => {
      this.stationId = params['id'];
      console.log(this.stationId);
    });
    this.getStationDetails();
  }

  private initializeForm() {
    this.editStationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      zmk: ['', Validators.compose([Validators.required])],
      zpk: ['', Validators.compose([Validators.required])],
      // status: ['', Validators.compose([Validators.required])],
      channelHost: ['', Validators.compose([Validators.required])],
      channelPort: ['', Validators.compose([Validators.required])],
      baseUrl: ['', Validators.compose([Validators.required])],
      authUsername: ['', Validators.compose([Validators.required])],
      authPassword: ['', Validators.compose([Validators.required])],

    });
  }

  private getStationDetails() {
    this.stationsService.getStation(this.stationId).subscribe(
      (res) => {
        console.log(res);
        this.stationDetails = res['data'];
        this.editStationForm.patchValue(this.stationDetails);
        this.editStationForm.controls['channelHost'].setValue(this.stationDetails.channelConfig.host);
        this.editStationForm.controls['channelPort'].setValue(this.stationDetails.channelConfig.port);



        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error);
        this.isLoading = false;
      },
    );
  }

  private updateStation() {
    this.isUpdating = true;
    this.stationsService.updateStation(this.stationId, this.editStationForm.value).subscribe(
      (res) => {
        console.log(res);
        this.stationDetails = res['data'];
        this.alertService.success('Station successfully updated', true);
        this.router.navigate(['../user/stations/' + this.stationId + '/station-details']);
        this.isUpdating = false;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error);
        this.isUpdating = false;
      },
    );
  }

}
