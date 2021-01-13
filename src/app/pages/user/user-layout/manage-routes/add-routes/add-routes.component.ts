import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { RoutingRulesInterface } from 'src/app/pages/shared/interfaces/routing-rules.model';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';
import { RULETYPES } from 'src/app/pages/shared/constants';

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

  constructor(
    private routingCompService: RouteComponentService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    this.ruletypes = RULETYPES;
    console.log(this.ruletypes);

    // Call to get default destination Stations
    this.getDestinationStations();
  }
  getDestinationStations(): void {
    this.routingCompService.getAllStations().subscribe((response) => {
      this.stations = response.data.stations;
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
    console.log(this.createRouteForm.value);
    this.routingCompService
      .createRoutingRule(this.createRouteForm.value)
      .subscribe(
        (response) => {
          console.log('sucessfully addes', response);
        },
        (error) => {
          console.log('an error ocured ', error);
        }
      );
  }

  createRuleConfigForm(): FormGroup {
    return this.fb.group({
      rule: '',
      value: '',
      max: '',
      min: '',
      ds: '',
    });
  }

  duplicateForm(): void {
    console.log('here');

    this.ruleConfig = this.createRouteForm.get('rule_config') as FormArray;
    this.ruleConfig.push(this.createRuleConfigForm());
  }
}
