import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PtspsService } from '../ptsps.service';


declare var $: any;

@Component({
  selector: 'app-ptsp-details',
  templateUrl: './ptsp-details.component.html',
  styleUrls: ['./ptsp-details.component.scss']
})
export class PtspDetailsComponent implements OnInit {
  showFilter: boolean;
  private route$: Subscription;




  ptspId: any;
  ptspDetails: any;
  isLoading = true;
  isDisabling = false;
  isEnabling = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
     private router: Router, private ptspService: PtspsService, private alertService: AlertService) {
    this.showFilter = false;


  }

  ngOnInit() {
    this.route$ = this.route.params.subscribe((params: Params) => {
      this.ptspId = params["id"];
      console.log(this.ptspId);
    });
    this.getPTSPDetails();
  }

  
  
  getPTSPDetails() {
    this.ptspService.getPTSP(this.ptspId).subscribe(
      (res) => {
        console.log(res);
        this.ptspDetails = res['data'];
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error);
        this.isLoading = false;
      }
    );
  }

  disablePTSP() {
    this.isDisabling = true;
    this.ptspService.disablePTSP(this.ptspId).subscribe(
      (res) => {
        console.log(res);
        this.alertService.success('PTSP disabled successfully');
        this.getPTSPDetails();
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

  enablePTSP() {
    this.isEnabling = true;
    this.ptspService.enablePTSP(this.ptspId).subscribe(
      (res) => {
        console.log(res);
        this.alertService.success('PTSP enabled successfully');
        this.getPTSPDetails();
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

