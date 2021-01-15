import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StationsService } from '../stations.service';

@Component({
  selector: 'app-update-station',
  templateUrl: './update-station.component.html',
  styleUrls: ['./update-station.component.scss']
})
export class UpdateStationComponent implements OnInit {
  showFilter: boolean;
  private route$: Subscription;



  editStationForm: any;
  stationId: any;
  stationDetails: any;
  isLoading = true;
  isUpdating = false;
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
      //status: ['', Validators.compose([Validators.required])],
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
        this.editStationForm.patchValue(this.stationDetails);
       
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error);
        this.isLoading = false;
      }
    );
  }


  updateStation() {
    this.isUpdating = true;
    this.stationsService.updateStation(this.stationId, this.editStationForm.value).subscribe(
      (res) => {
        console.log(res);
        this.stationDetails = res['data'];
        this.alertService.success("Station successfully updated", true);
        this.router.navigate(['../user/stations/' + this.stationId + '/station-details'])
        this.isUpdating = false;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error);
        this.isUpdating = false;
      }
    );
  }


}
