import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { RoutingRulesInterface } from 'src/app/pages/shared/interfaces/routing-rules.model';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';
import { RULETYPES } from 'src/app/pages/shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';

@Component({
  selector: 'app-add-routes',
  templateUrl: './add-routes.component.html',
  styleUrls: ['./add-routes.component.scss'],
})
export class AddRoutesComponent implements OnInit {
  createRouteForm: FormGroup;
  ruleConfig;
  ruletypes;
  stations: [];
  value: string = 'safd';
  routing: any;
  routeConfigs: any;
  isAddingRoute: boolean;

  constructor(
    private routingCompService: RouteComponentService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.ruletypes = RULETYPES;
    console.log(this.ruletypes);

    this.getDestinationStations();
  }
  // setFormValue(route) {
  //   console.log('Router in set form value', route);
  //   let ore = 'asfd';
  //   this.createRouteForm.patchValue({
  //     default_ds: ore,
  //     rule: 'adsf',
  //     rule_config: [
  //       {
  //         rule: 'asfd',
  //         value: 'adsf',
  //         max: 'afds',
  //         min: 'asfdads',
  //         ds: 'asdfasf',
  //       },
  //     ],
  //     use_default: true,
  //   });
  // }
  // setRuleConfigForm(): any {
  //   this.createRuleConfigForm.set;
  // }
  getDestinationStations(): void {
    this.routingCompService.getAllStations().subscribe((response) => {
      this.stations = response.data.content;
    }),
      (error) => {
        console.log('Error in COmp', error);
      };
  }

  initializeForm() {
    this.createRouteForm = this.fb.group({
      default_ds: ['', Validators.required],
      rule: ['', Validators.required],
      rule_config: this.fb.array([this.createRuleConfigForm()]),
      use_default: [false],
    });
  }

  createRoute(): void {
    this.isAddingRoute = true;
    console.log('ERERERER', this.createRouteForm.value);
    this.createRouteForm.get('rule_config').value.map((config) => {
      config.rule = this.createRouteForm.get('rule').value;
    });
    console.log(this.createRouteForm.value);
    this.routingCompService
      .createRoutingRule(this.createRouteForm.value)
      .subscribe(
        (response) => {
          this.isAddingRoute = false;
          this.alertService.success(response.message, true);
        },
        (error) => {
          this.isAddingRoute = false;
          console.log('an error ocured ', error);
          console.log(error);
          this.alertService.error(error);
        }
      );
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

  removeConfig() {
    this.ruleConfig = this.createRouteForm.get('rule_config') as FormArray;
    this.ruleConfig.controls.pop();
    this.ruleConfig['status'] = 'VALID';
    // this.createRouteForm['status'] = 'VALID'
  }

  duplicateForm(): void {
    this.ruleConfig = this.createRouteForm.get('rule_config') as FormArray;
    this.ruleConfig.push(this.createRuleConfigForm());
  }
}
