import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';

@Component({
  selector: 'app-routes-details',
  templateUrl: './routes-details.component.html',
  styleUrls: ['./routes-details.component.scss']
})
export class RoutesDetailsComponent implements OnInit {
  editAcquirerForm: FormGroup;
  routing: any;
  routeConfigs: any;


  constructor(private routingCompService: RouteComponentService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const routeId = this.route.snapshot.params.id
    this.routingCompService.getSingleRoute(routeId).subscribe(
      (response) => {
        let parsedData = JSON.parse(response.data.rule_config)
        response.data.rule_config = parsedData
        this.routing = parsedData
        this.routeConfigs = this.routing.ruleconfig
      }
    ), (error) => {
      console.log(error);

    }
  }

}
