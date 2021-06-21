import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { RULETYPES } from 'src/app/pages/shared/constants';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';

@Component({
  selector: 'app-edit-routes',
  templateUrl: './edit-routes.component.html',
  styleUrls: ['./edit-routes.component.scss'],
})
export class EditRoutesComponent implements OnInit {
  defaultDestinationStation: string;
  routeToBeEditted: any;
  ruleConfigForRouteToBeEditted: [];
  destinationStations: void;
  editRouteForm: FormGroup;
  ruletypes: string[];
  routeRuleType: string;
  ruleConfig: FormArray;
  routeConfigArrayLength: any;
  RoutingRule: any = {};
  routeId: any;
  isUpdatingRoute: boolean;
  routingRules: any;

  constructor(
    private routeCompService: RouteComponentService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private acquirerService: AcquirerService
  ) {}

  ngOnInit() {
    this.initializeForms();

    this.getRouteToBeEditted();
    this.getAllDestinationStations();
    this.ruletypes = RULETYPES;
  }

  initializeForms() {
    this.editRouteForm = this.fb.group({
      default_ds: ['', Validators.required],
      rule: ['', Validators.required],
      rule_config: this.fb.array([this.createRuleConfigForm()]),
      use_default: [false],
    });
  }

  createRuleConfigForm(): FormGroup {
    return this.fb.group({
      rule: [''],
      value: ['', Validators.required],
      max: ['', Validators.required],
      min: ['', Validators.required],
      ds: ['', Validators.required],
    });
  }

  getRouteToBeEditted() {
    this.routeId = this.route.snapshot.params.id;
    this.routeCompService.getSingleRoute(this.routeId).subscribe(
      (response) => {
        console.log('THIS IS THE ROUTE TO EDITTED', response);
        this.routeToBeEditted = response.data;

        // PARSE THE DATA
        let parsedData = JSON.parse(response.data.rule_config);
        response.data.rule_config = parsedData;
        // SET FORM VALUE
        this.defaultDestinationStation = response.data.default_ds;
        // this.defaultDestinationStation = 'transware';

        console.log('This defaut Ds', this.defaultDestinationStation);

        this.routeRuleType = response.data.rule;
        this.ruleConfigForRouteToBeEditted =
          response.data.rule_config.ruleconfig;
        this.ruleConfigForRouteToBeEditted.forEach((config: any) => {
          config.max = config.max;
          config.min = config.min;
          config.ds = config.ds;
        });

        this.duplicateFormField(this.ruleConfigForRouteToBeEditted.length);

        console.log('afadsf', this.ruleConfigForRouteToBeEditted);
        console.log('asfsdasdf', this.ruleConfig);

        // SET FORM VALUE
        this.setEditFormValue();
        console.log(this.editRouteForm);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  duplicateFormField(numberOfConfig) {
    for (let i = 1; i < numberOfConfig; i++) {
      this.duplicateForm();
    }
  }

  setEditFormValue() {
    let data = this.RoutingRule;

    data.default_ds = this.defaultDestinationStation;
    data.rule = this.routeRuleType;
    data.rule_config = this.ruleConfigForRouteToBeEditted;
    data.use_default = true;

    this.editRouteForm.patchValue(data);
  }

  getAllDestinationStations() {
    this.routeCompService.getAllStations().subscribe((response) => {
      this.destinationStations = response.data.content;
      // this.setEditFormValue();
    });
  }

  editRoute() {
    this.isUpdatingRoute = true;
    console.log(this.editRouteForm.value);

    this.editRouteForm.get('rule_config').value.map((config) => {
      config.rule = this.editRouteForm.get('rule').value;
    });

    this.routeCompService
      .editRoute(this.editRouteForm.value, this.routeId)
      .subscribe(
        (response) => {
          console.log('RESponse AFER EDITTED', response);
          this.isUpdatingRoute = false;
          this.alertService.success('Routing Rule Updated Successfully', true);
          this.router.navigate([
            '../../../../user/routes/route-details/' + this.routeId,
          ]);

          // this.router.navigate(['../../route-details', this.routeId]);
        },
        (error) => {
          console.log('ERROR EDITTING ROUTE', error);

          this.isUpdatingRoute = false;
          this.alertService.error(error);
        }
      );
  }

  removeConfig(skillGroupIndex: number): void {
    (<FormArray>this.editRouteForm.get('rule_config')).removeAt(
      skillGroupIndex
    );
  }

  duplicateForm(): void {
    console.log('here');
    console.log(this.ruleConfig);

    this.ruleConfig = this.editRouteForm.get('rule_config') as FormArray;
    this.ruleConfig.push(this.createRuleConfigForm());
    console.log(this.ruleConfig);
  }
}
// {
//     "username": "admin",
//     "password": "RmcWuVrO",
// fdsf
// }
