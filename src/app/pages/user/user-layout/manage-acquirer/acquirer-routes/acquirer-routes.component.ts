import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoutingRulesInterface } from 'src/app/pages/shared/interfaces/routing-rules.model';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';

@Component({
  selector: 'app-acquirer-routes',
  templateUrl: './acquirer-routes.component.html',
  styleUrls: ['./acquirer-routes.component.scss'],
})
export class AcquirerRoutesComponent implements OnInit {
  routingRules


  // Test
  createAcquirerForm: FormGroup;
  showFilter: boolean;
  isCSVLoading: boolean;
  isUserCreating: boolean;
  searchForm: FormGroup;
  ngForArray: any;

  constructor(private formBuilder: FormBuilder, private routingCompService: RouteComponentService) {
    this.showFilter = false;
    this.showFilter = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;

    this.initializeForm();
  }

  ngOnInit() {
    // this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    // this.routingCompService.getAllRoutingRules().subscribe(
    //   (response: RoutingRulesInterface) => {
    //     this.routingRules = JSON.parse(response.data.routingRules[0].rule_config)
    //     console.log(JSON.parse(response.data.routingRules[0].rule_config));
    //   }

    // )
  }



  initializeForm() {
    this.searchForm = this.formBuilder.group({
      acquirerName: '',
      cbnCode: '',
    });
    this.createAcquirerForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }

  reset() { }
}
