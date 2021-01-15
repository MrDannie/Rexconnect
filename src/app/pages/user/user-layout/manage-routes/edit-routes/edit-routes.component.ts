import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RULETYPES } from 'src/app/pages/shared/constants';
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

  constructor(
    private routeCompService: RouteComponentService,
    private route: ActivatedRoute,
    private fb: FormBuilder
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
      // rule_config: this.fb.array([this.createRuleConfigForm()]),
      use_default: [false],
    });
  }

  createRuleConfigForm(): FormGroup {
    return this.fb.group({
      rule: 'hhhhh',
      value: '',
      max: '',
      min: '',
      ds: '',
    });
  }

  getRouteToBeEditted() {
    const routeId = this.route.snapshot.params.id;
    this.routeCompService.getSingleRoute(routeId).subscribe(
      (response) => {
        console.log('rotues ot edidttes', response);
        this.defaultDestinationStation = response.data.default_ds;
        this.routeRuleType = response.data.rule;
        let parsedData = JSON.parse(response.data.rule_config);
        response.data.rule_config = parsedData;
        this.ruleConfigForRouteToBeEditted =
          response.data.rule_config.ruleconfig;
        this.routeConfigArrayLength = this.ruleConfigForRouteToBeEditted.length;
        console.log('Herer i love', this.routeConfigArrayLength);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getAllDestinationStations() {
    this.routeCompService.getAllStations().subscribe((response) => {
      this.destinationStations = response.data.stations;
      this.setEditFormValue();
    });
  }
  setEditFormValue() {
    this.editRouteForm.patchValue({
      default_ds: this.defaultDestinationStation,
      rule: this.routeRuleType.toLocaleLowerCase(),
      rule_config: this.ruleConfigForRouteToBeEditted,
      use_default: true,
    });
  }

  createRoute() {
    console.log(this.editRouteForm.value);
  }

  duplicateForm(): void {
    console.log('here');

    this.ruleConfig = this.editRouteForm.get('rule_config') as FormArray;
    this.ruleConfig.push(this.createRuleConfigForm());
  }
}
