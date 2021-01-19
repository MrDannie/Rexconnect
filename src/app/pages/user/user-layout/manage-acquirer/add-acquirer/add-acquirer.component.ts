import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';

@Component({
  selector: 'app-add-acquirer',
  templateUrl: './add-acquirer.component.html',
  styleUrls: ['./add-acquirer.component.scss'],
})
export class AddAcquirerComponent implements OnInit {
  createAcquirerForm: any;
  routingRules;
  ptspsList: [];
  routesToAdd: any = [];
  ptspsToAdd: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private acquirerService: AcquirerService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    // GET PTSPS
    this.getPtsts();

    //GET ROUTES
    this.getRoutes();

    this.initializeForm();
  }

  initializeForm() {
    this.createAcquirerForm = this.formBuilder.group({
      clientName: ['', Validators.compose([Validators.required])],
      bankCode: ['', Validators.compose([Validators.required])],
      // acquirerTeminalPrefix: ['', Validators.compose([Validators.required])],
      clientLocation: ['', Validators.compose([Validators.required])],
      clientAddress: ['', Validators.compose([Validators.required])],
      ptsps: ['', Validators.compose([Validators.required])],
      routingRules: ['', Validators.compose([Validators.required])],
    });
  }

  // GET PTSPS
  getPtsts() {
    this.acquirerService.getPtspsList().subscribe(
      (response) => {
        this.ptspsList = response['data'];
        console.log(this.ptspsList);
      },
      (error) => {
        this.alertService.error(error);
      }
    );
  }

  getRoutes() {
    this.acquirerService.getRoutesList().subscribe(
      (response) => {
        this.routingRules = response['data'];
        console.log('ROUTES LIST', this.routingRules);
      },
      (error) => {
        this.alertService.error(error);
      }
    );
  }

  addRouteRule(routesRule) {
    if (this.routesToAdd.includes(routesRule)) {
      for (let i = 0; i < this.routesToAdd.length; i++) {
        if (this.routesToAdd[i] === routesRule) {
          this.routesToAdd.splice(i, 1);
        }
      }
    } else {
      this.routesToAdd.push(routesRule);
      console.log(this.routesToAdd);
    }
  }

  addPtsps(ptsps) {
    if (this.ptspsToAdd.includes(ptsps)) {
      for (let i = 0; i < this.ptspsToAdd.length; i++) {
        if (this.ptspsToAdd[i] === ptsps) {
          this.ptspsToAdd.splice(i, 1);
        }
      }
    } else {
      this.ptspsToAdd.push(ptsps);
      console.log(this.ptspsToAdd);
    }
  }

  selectAllRoutes() {}

  toggleAllRoutesCheckbox(source) {
    // var routesCheckboxes = document.querySelectorAll('input[type="checkbox"]');
    // console.log('Check boxes', routesCheckboxes);
    // for (var checkbox of routesCheckboxes) {
    //   checkbox.checked = source.checked;
    // }
  }

  addAcquirer(formValue) {}
}
