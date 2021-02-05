import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';

declare var $: any;

@Component({
  selector: 'app-add-acquirer',
  templateUrl: './add-acquirer.component.html',
  styleUrls: ['./add-acquirer.component.scss'],
})
export class AddAcquirerComponent implements OnInit {
  createAcquirerForm: any;
  routingRules: any;
  ptspsList: [];
  routesToAdd: any = [];
  ptspsToAdd: any = [];
  routingRulesToBeAdded: any = [];
  ruleOrder: string[] = [];
  isAddingAcquirer: boolean;
  showDropdown: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private acquirerService: AcquirerService,
    private alertService: AlertService
  ) {
    this.showDropdown = false;
  }

  ngOnInit() {
    // GET PTSPS
    this.getPtsts();

    //GET ROUTES
    this.getRoutes();

    this.initializeForm();

    // this.routingRules = ['here', 'farm', 'postillion', 'daniel', 'friday'];
  }

  initializeForm() {
    this.createAcquirerForm = this.formBuilder.group({
      clientName: ['', Validators.compose([Validators.required])],
      bankCode: ['', Validators.compose([Validators.required])],
      clientLocation: ['', Validators.compose([Validators.required])],
      clientAddress: ['', Validators.compose([Validators.required])],
      currencyCode: ['', Validators.compose([Validators.required])],

      terminalPrefix: [[''], Validators.compose([Validators.required])],
      shortName: ['', Validators.compose([Validators.required])],
      // ruleOrder: ['', Validators.compose([Validators.required])],
      // ptsps: ['', Validators.compose([Validators.required])],
      // routingRules: ['', Validators.compose([Validators.required])],
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
    ptsps = parseInt(ptsps);
    console.log('hagssfd', ptsps);
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

  removeRuleFromRuleOrder(ruleType: string) {
    this.ruleOrder = this.ruleOrder.filter((rule) => rule != ruleType);
    const ruleToBeRemoved = this.routingRules.find(
      (rule) => rule.rule === ruleType
    );
    this.routingRulesToBeAdded = this.routingRulesToBeAdded.filter(
      (item) => item != +ruleToBeRemoved.id
    );
    console.log('RUlE TO BE REMOVED FROM RULE TO BE ADDED', ruleToBeRemoved);
  }

  addAcquirer(formValue) {
    if (this.routingRulesToBeAdded.length < 1) {
      this.alertService.info('Please Routes must be selected.', true);
      return;
    }

    if (this.ptspsToAdd.length < 1) {
      this.alertService.info('Please Ptsps must be selected.', true);
      return;
    }
    this.isAddingAcquirer = true;
    formValue.routingRules = this.routingRulesToBeAdded;
    formValue.ptsps = this.ptspsToAdd;
    formValue.ruleOrder = this.ruleOrder;
    formValue.terminalPrefix = [
      this.createAcquirerForm.get('terminalPrefix').value,
    ];
    console.log('FORM VAL,', formValue);

    // ADD RULE
    this.acquirerService.addAcquirer(formValue).subscribe(
      (response) => {
        this.isAddingAcquirer = false;
        this.alertService.success('Acquirer Successfully Added', true);
        console.log('SUCEESS', response);
      },
      (error) => {
        this.isAddingAcquirer = false;
        this.alertService.error(error);
        console.log('ERROR', error);
      }
    );
  }

  toggleAllPtspsCheckbox() {
    $('.ptspsCheckBoxName').prop(
      'checked',
      $('#select-all-for-ptsps').prop('checked')
    );
    // EMPTY THE ARRAY
    this.ptspsToAdd = [];
    if ($('.ptspsCheckBoxName').prop('checked')) {
      this.ptspsList.forEach((ptsps: any) => {
        if (this.ptspsToAdd.includes(Number(ptsps.id))) {
          for (let i = 0; i < this.ptspsToAdd.length; i++) {
            if (this.ptspsToAdd[i] === ptsps.id) {
              this.ptspsToAdd.splice(i, 1);
            }
          }
        } else {
          this.ptspsToAdd.push(parseInt(ptsps.id));
          console.log(this.ptspsToAdd);
        }
      });
    } else {
      this.ptspsToAdd = [];
    }

    console.log('THis IS THE BULK ROUTE ADDED', this.ptspsToAdd);
  }

  addRuleType(ruleIdToBeAdded: string, ruleNameToBeAdded: string) {
    this.ruleOrder.push(ruleNameToBeAdded);
    this.routingRulesToBeAdded.push(parseInt(ruleIdToBeAdded));
    console.log('Array Of Routing Rules', this.routingRulesToBeAdded);
    console.log('ARRAY OF RULE ORDER', this.ruleOrder);
  }

  removeRuleType(ruleId, ruleName) {
    this.ruleOrder = this.ruleOrder.filter((rule) => rule != ruleName);
    this.routingRulesToBeAdded = this.routingRulesToBeAdded.filter(
      (item) => item != ruleId
    );
  }
}
