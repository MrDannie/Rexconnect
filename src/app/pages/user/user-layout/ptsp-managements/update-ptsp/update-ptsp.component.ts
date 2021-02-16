import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StationsService } from '../../manage-stations/stations.service';
import { PtspsService } from '../ptsps.service';

@Component({
  selector: 'app-update-ptsp',
  templateUrl: './update-ptsp.component.html',
  styleUrls: ['./update-ptsp.component.scss']
})
export class UpdatePtspComponent implements OnInit {
  showFilter: boolean;
  private route$: Subscription;



  editPTSPForm: FormGroup;
  ptspId: any;
  ptspDetails: any;
  isLoading = true;
  isUpdating = false;
  isEnabling = false;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
     private router: Router, private ptspService: PtspsService, private alertService: AlertService) {
    this.showFilter = false;

    this.initializeForm();
  }

  ngOnInit() {
    
    this.route$ = this.route.params.subscribe((params: Params) => {
      this.ptspId = params["id"];
      console.log(this.ptspId);
    });
    this.getPTSPDetails();
    
  }

  initializeForm() {
    this.editPTSPForm = this.formBuilder.group({
      Ptspname: ['', Validators.compose([Validators.required])],
      Ptspctmk: ['', Validators.compose([Validators.required])],
      Ptspctmkblock: ['', Validators.compose([Validators.required])],
     // status: ['', Validators.compose([Validators.required])],
      PtspCode: ['', Validators.compose([Validators.required])],
      Ptspctmkblockkcv: ['', Validators.compose([Validators.required])],
      Ptspctmkkcv: ['', Validators.compose([Validators.required])]
    });
  }

  getPTSPDetails() {
    this.ptspService.getPTSP(this.ptspId).subscribe(
      (res) => {
        console.log(res);
        this.ptspDetails = res['data'];
        this.editPTSPForm.patchValue(this.ptspDetails);
        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error);
        this.isLoading = false;
      }
    );
  }


  updatePTSP() {
    this.isUpdating = true;
    this.ptspService.updatePTSP(this.ptspId, this.editPTSPForm.value).subscribe(
      (res) => {
        console.log(res);
        this.ptspDetails = res['data'];
        this.alertService.success("PTSP successfully updated", true);
        this.router.navigate(['../user/ptsp/' + this.ptspId + '/ptsp-details']);
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
