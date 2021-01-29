import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/core/alert/alert.service';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';

declare var $: any;

@Component({
  selector: 'app-update-acquirer',
  templateUrl: './update-acquirer.component.html',
  styleUrls: ['./update-acquirer.component.scss'],
})
export class UpdateAcquirerComponent implements OnInit {
  acquirerId: any;
  acquirerToBeUpdated: any;
  editAcquirerForm: FormGroup;
  routingRules: any;
  ptspsList: any;
  routingRulesToBeAdded: any = [];
  ruleOrder: any = [];
  isFiltering = false;
  ptspsToAdd: any = [];
  routesToAdd: any = [];
  ptspsListOfAcquirer: number[];
  isAddingAcquirer: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private acquirerService: AcquirerService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.initializeForm();

    //get the acquier
    this.getAcquirerToBeEditted();

    //GET ROUTES
    this.getRoutes();

    // GET PTSPS
    this.getPtsts();
  }

  initializeForm() {
    this.editAcquirerForm = this.formBuilder.group({
      clientName: ['', Validators.compose([Validators.required])],
      bankCode: ['', Validators.compose([Validators.required])],
      clientLocation: ['', Validators.compose([Validators.required])],
      clientAddress: ['', Validators.compose([Validators.required])],
      currencyCode: ['', Validators.compose([Validators.required])],
      terminalPrefix: [[''], Validators.compose([Validators.required])],
      shortName: ['', Validators.compose([Validators.required])],
      ruleOrder: ['', Validators.compose([Validators.required])],
      ptsps: ['', Validators.compose([Validators.required])],
      routingRules: ['', Validators.compose([Validators.required])],
    });
  }

  getAcquirerToBeEditted() {
    this.acquirerId = this.route.snapshot.params.id;
    this.acquirerService.getSingleAcquirer(this.acquirerId).subscribe(
      (response) => {
        this.acquirerToBeUpdated = response['data'];

        //extract Rule Order & Routing Rules
        this.ruleOrder = ['Bin_series', 'PROC_CODE', 'scheme'];
        this.routingRulesToBeAdded = [1, 2, 3, 4, 5];
        this.ptspsListOfAcquirer = [1, 2, 3, 4, 5];
        this.ptspsToAdd = this.ptspsListOfAcquirer;
        console.log(this.acquirerToBeUpdated);
        this.fillFormValue();
      },
      (error) => {
        this.alertService.error(error);
      }
    );
  }

  fillFormValue() {
    this.editAcquirerForm.patchValue({
      clientName: this.acquirerToBeUpdated.clientName,
      bankCode: this.acquirerToBeUpdated.bankCode,
      clientLocation: this.acquirerToBeUpdated.clientLocation,
      clientAddress: this.acquirerToBeUpdated.clientAddress,
      currencyCode: this.acquirerToBeUpdated.currencyCode,
      terminalPrefix: [this.acquirerToBeUpdated.terminalPrefix],
      shortName: this.acquirerToBeUpdated.shortName,
      ruleOrder: '',
      ptsps: '',
      routingRules: '',
    });

    this.addAcquirer(this.editAcquirerForm.value);

    console.log('HERHE IS EDIT ACQUIRER FORM', this.editAcquirerForm.value);
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

  addAcquirer(formValue) {
    // this.isAddingAcquirer = true;
    // formValue.routingRules = this.routingRulesToBeAdded;
    // formValue.ptsps = this.ptspsToAdd;
    // formValue.ruleOrder = this.ruleOrder;
    // formValue.terminalPrefix = [
    //   this.editAcquirerForm.get('terminalPrefix').value,
    // ];
    // console.log('FORM VAL,', formValue);

    // // ADD RULE
    // this.acquirerService.updateAcquirer(formValue, this.acquirerId).subscribe(
    //   (response) => {
    //     this.isAddingAcquirer = false;
    //     this.alertService.success('Acquirer Successfully Added', true);
    //     console.log('SUCEESS', response);
    //   },
    //   (error) => {
    //     this.isAddingAcquirer = false;
    //     this.alertService.error(error);
    //     console.log('ERROR', error);
    //   }
    // );

    this.acquirerService
      .updateAcquirer(this.editAcquirerForm.value, this.acquirerId)
      .subscribe(
        (response) => {
          console.log('Sucess', response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
