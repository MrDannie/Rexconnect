import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { RoutingRulesInterface } from 'src/app/pages/shared/interfaces/routing-rules.model';
import { FileGenerationService } from 'src/app/pages/shared/services/file-generation.service';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';
import { RULETYPES } from 'src/app/pages/shared/constants';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.scss'],
})
export class RoutesComponent implements OnInit {
  routingRules;
  rawResponse;
  dataCount;

  allRoutes = [];

  isLoaded: boolean;

  stations = [];
  rules = [];

  // Test
  createAcquirerForm: FormGroup;
  showFilter: boolean;
  isCSVLoading: boolean;
  isUserCreating: boolean;
  searchForm: FormGroup;
  pageIndex: number;
  pageSize: number;
  isLoading: boolean;
  // allRoutes: any;
  isFiltering: any = false;

  filter;
  routesRecordsToDownload: any;

  constructor(
    private formBuilder: FormBuilder,
    private routingCompService: RouteComponentService,
    private paginationService: PaginationService,
    private alertService: AlertService,
    private fileGenerationService: FileGenerationService
  ) {
    this.showFilter = false;
    this.showFilter = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;
    this.initializeForm();
    this.isLoaded = true;
  }

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;

    this.rules = RULETYPES;

    this.getAllRoutingRules();
    // this.getDestinationStations();
  }

  // GET ALL ROUTING RULES
  getAllRoutingRules(options?: any) {
    this.isLoading = true;
    this.routingCompService
      .getAllRoutingRules(this.pageIndex, this.pageSize, options)
      .subscribe(
        (response) => {
          this.isLoading = false;

          console.log(response);
          // FOR PAGINATION
          this.dataCount = response['data']['totalElements'];
          this.allRoutes = response['data']['content'];
          console.log('UNPARSED RESPONSE DATA', response);

          // PARSING THE OBJECT
          this.routingRules = response.data.content;
          let parsedData = response.data.content.map((item) =>
            JSON.parse(item.rule_config)
          );
          this.routingRules.map((item) => (item.rule_config = parsedData));
          console.log('PARSED RESPONSE DATA', this.routingRules);

          this.paginationService.pagerState.next({
            totalElements: this.dataCount,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          });
        },
        (error) => {
          this.isLoaded = true;
          this.isLoading = false;
          this.paginationService.pagerState.next(null);
          // this.paginationService.changePagerState.next(false);
          console.error('error occurred: ', error);
          this.alertService.error(error);
        }
      );
  }

  performFiltering() {
    this.pageIndex = 0;
    this.showFilter = false;
    console.log('asdfadfadf', this.searchForm.value);

    const filterProperties = {
      default_ds: this.searchForm.value.default_ds || '',
      rule: this.searchForm.value.rule || '',
    };

    console.log(filterProperties);
    this.getAllRoutingRules(filterProperties);
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      default_ds: [''],
      rule: [''],
    });
  }

  requestPageSize(value: number) {
    this.pageSize = value;
    this.getAllRoutingRules();
  }

  beginDownload() {
    this.exportRoutes();
  }
  exportRoutes() {
    const dataToDownload: any[] = [];
    this.isCSVLoading = true;
    // const currentPageSize = this.pageSize;

    const downloadPageSize = this.dataCount;
    this.pageIndex = 0;

    this.routingCompService
      .getAllRoutingRules(
        this.pageIndex,
        downloadPageSize,
        this.searchForm.value
      )
      .subscribe(
        (data: any) => {
          this.routesRecordsToDownload = data['data']['content'];

          for (
            let index = 0;
            index < this.routesRecordsToDownload.length;
            index++
          ) {
            dataToDownload.push([]);
            dataToDownload[index]['Default DS'] = this.clean(
              'default_ds',
              index
            );
            dataToDownload[index]['Rule Type'] = this.clean('rule', index);
            dataToDownload[index]['Use Default'] =
              this.allRoutes[index]['use_default'] === 1 ? 'True' : 'False';
          }
          console.log('dataToDownload In Exxport Users', dataToDownload);
          this.exportRecords(dataToDownload);
        },
        (error) => {
          this.alertService.error(error);
        }
      );
  }
  exportRecords(dataToDownload: any[]) {
    const headers = ['Default DS', 'Rule Type', 'Use Default'];
    this.fileGenerationService.generateCSV(
      dataToDownload,
      headers,
      'All Routes'
    );
    this.fileGenerationService.onDownloadCompleted.next(true);
    this.isCSVLoading = false;
  }

  clean(key: string, index: number): any {
    return this.routesRecordsToDownload[index][key]
      ? this.routesRecordsToDownload[index][key]
      : '';
  }

  onRefreshData(pageParams: { pageIndex: number; pageSize: number }) {
    this.pageIndex = pageParams.pageIndex;
    this.pageSize = pageParams.pageSize;

    this.getAllRoutingRules();
  }

  clearFilters() {
    this.searchForm.reset();

    this.pageIndex = 0;
    this.pageSize = 10;

    this.getAllRoutingRules();
  }
}
