import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { RoutingRulesInterface } from 'src/app/pages/shared/interfaces/routing-rules.model';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';
import { RULETYPES } from 'src/app/pages/shared/constants'

@Component({
  selector: 'app-add-routes',
  templateUrl: './add-routes.component.html',
  styleUrls: ['./add-routes.component.scss']
})
export class AddRoutesComponent implements OnInit {
  createRouteForm: FormGroup;
  ruleConfig
  ruletypes

  constructor(private routingCompService: RouteComponentService, private fb: FormBuilder) { }

  ngOnInit() {
    this.initializeForm()
    this.ruletypes = RULETYPES
    console.log(this.ruletypes);

  }


  initializeForm() {
    this.createRouteForm = this.fb.group({
      station: ['', Validators.required],
      ruleConfig: this.fb.array([
        this.createRuleConfigForm()
      ]),
      useDefault: [true]
    })
  }

  createRoute(): void {
    console.log(this.createRouteForm.value);
    this.routingCompService.createRoutingRule(this.createRouteForm.value).subscribe(
      (response) => {
        console.log("sucessfully addes", response)
      }, (error) => {
        console.log("an error ocured ", error);
      }
    )
  }


  createRuleConfigForm(): FormGroup {
    return this.fb.group({
      ruleType: '',
      value: '',
      max: '',
      min: '',
      destinationStation: ''
    });
  }


  duplicateForm(): void {
    console.log('here');

    this.ruleConfig = this.createRouteForm.get('ruleConfig') as FormArray;
    this.ruleConfig.push(this.createRuleConfigForm());
  }



}
