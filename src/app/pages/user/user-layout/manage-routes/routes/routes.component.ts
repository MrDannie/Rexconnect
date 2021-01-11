import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RoutingRulesInterface } from 'src/app/pages/shared/interfaces/routing-rules.model';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss']
})
export class RoutesComponent implements OnInit {
  routingRules
  rawResponse


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
    this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    this.routingCompService.getAllRoutingRules().subscribe(
      (response: RoutingRulesInterface) => {
        console.log("UNPARSED RESPONSE DATA", response);
        this.routingRules = response.data.routingRules;
        let parsedData = response.data.routingRules.map((item) =>
          JSON.parse(item.rule_config)
        )
        this.routingRules.map((item) => item.rule_config = parsedData)
        console.log("PARSED RESPONSE DATA", this.routingRules);
      }
    )
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
