import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';
import { Router } from '@angular/router';
import { countries, currencies } from '../../../../../pages/shared/constants';

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
  currencyCodes: any;
  countryCodes: any;
  constructor(
    private formBuilder: FormBuilder,
    private acquirerService: AcquirerService,
    private alertService: AlertService,
    private router: Router
  ) {
    this.showDropdown = false;
  }

  ngOnInit() {
    // GET PTSPS
    this.getPtsts();

    //GET ROUTES
    this.getRoutes();

    this.initializeForm();

    this.getCurrencyCodes();

    this.getCountries();

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
      email: ['', Validators.required],
      // ruleOrder: ['', Validators.compose([Validators.required])],
      // ptsps: ['', Validators.compose([Validators.required])],
      // routingRules: ['', Validators.compose([Validators.required])],
    });
  }

  getCountries() {
    this.countryCodes = countries.COUNTRY_CODES;
    this.countryCodes = this.countryCodes.map(function (country) {
      country.fullCountryLabel =
        country['ISO3166-1-Alpha-3'] +
        ' ' +
        '(' +
        country['ISO3166-1-numeric'] +
        ')';
      return country;
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

  getCurrencyCodes() {
    this.currencyCodes = currencies.CURRENCY_CODES;
    this.currencyCodes = this.currencyCodes.map(function (curr) {
      curr.fullCurrencyLabel =
        curr['ISO4217-currency_name'] +
        ' ' +
        '(' +
        curr['ISO4217-currency_numeric_code'] +
        ')';
      return curr;
    });
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

    let terminalPrefix = this.createAcquirerForm.get('terminalPrefix').value;
    terminalPrefix = terminalPrefix.replace(/\s+/g, '');
    terminalPrefix = terminalPrefix.split(',');

    formValue.terminalPrefix = terminalPrefix;

    console.log('FORM VAL,', formValue);

    // ADD RULE
    this.acquirerService.addAcquirer(formValue).subscribe(
      (response) => {
        this.isAddingAcquirer = false;
        this.alertService.success('Acquirer Created Successfully ', true);
        this.router.navigate(['../user/acquirers/']);
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

  // onSelectCountryCode(countryCode) {
  //   const countryObj = countries.COUNTRY_CODES.find((country) => {
  //     return country['ISO3166-1-numeric'] == countryCode;
  //   });
  //   const countryAlpha2 = countryObj['ISO3166-1-Alpha-2'];
  //   // this.getAllCities(countryAlpha2);
  // }
}
