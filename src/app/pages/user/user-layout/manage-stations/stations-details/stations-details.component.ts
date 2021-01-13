import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StationsService } from '../stations.service';

declare var $:any;

@Component({
  selector: 'app-stations-details',
  templateUrl: './stations-details.component.html',
  styleUrls: ['./stations-details.component.scss'],
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

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
     private router: Router, private stationsService: StationsService, private alertService: AlertService) {
    this.showFilter = false;

    this.initializeForm();
  }

  ngOnInit() {
    this.route$ = this.route.params.subscribe((params: Params) => {
      this.stationId = params["id"];
      console.log(this.stationId);
    });
    this.getStationDetails();
  }

  initializeForm() {
    this.editStationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      zmk: ['', Validators.compose([Validators.required])],
      zpk: ['', Validators.compose([Validators.required])],
      status: ['', Validators.compose([Validators.required])],
      lastEcho: ['', Validators.compose([Validators.required])],
      channelHost: ['', Validators.compose([Validators.required])],
      channelPort: ['', Validators.compose([Validators.required])]
    });
  }

  getStationDetails() {
    this.stationsService.getStation(this.stationId).subscribe(
      (res) => {
        console.log(res);
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
        this.alertService.success('Station disabled successfully');
        this.getStationDetails();
        $('#confirmationModal').modal('hide');
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
