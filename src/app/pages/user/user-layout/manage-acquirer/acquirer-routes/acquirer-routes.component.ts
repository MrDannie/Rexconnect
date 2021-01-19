import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'console';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { RoutingRulesInterface } from 'src/app/pages/shared/interfaces/routing-rules.model';
import { FileGenerationService } from 'src/app/pages/shared/services/file-generation.service';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';

@Component({
  selector: 'app-acquirer-routes',
  templateUrl: './acquirer-routes.component.html',
  styleUrls: ['./acquirer-routes.component.scss'],
})
export class AcquirerRoutesComponent implements OnInit {
  routingRules;

  // Test
  createAcquirerForm: FormGroup;
  showFilter: boolean;
  isCSVLoading: boolean;
  isUserCreating: boolean;
  searchForm: FormGroup;
  ngForArray: any;
  acquirerRoute: any;
  dataCount: any;
  pageSize: number;
  pageIndex: number;
  isLoaded: boolean = false;
  isLoading: boolean;
  acquirerRouteToDownload: any;

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
  }

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.getAcquirerRoutes();
  }

  getAcquirerRoutes() {
    this.routingCompService
      .getAcquirerRoutes(this.pageSize, this.pageSize)
      .subscribe(
        (response) => {
          this.acquirerRoute = response['data']['routingRules'];
          this.dataCount = response['data']['count'];

          this.isLoaded = true;
          this.isLoading = false;

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
          console.error('error occurred: ', error);
          this.alertService.error(error);
        }
      );
  }

  requestPageSize(value: number) {
    this.pageSize = value;
    this.getAcquirerRoutes();
  }

  beginDownload() {
    this.exportUsers();
  }
  exportUsers() {
    const dataToDownload: any[] = [];
    // const currentPageSize = this.pageSize;

    const downloadPageSize = this.dataCount;
    this.pageIndex = 0;

    this.routingCompService
      .getAcquirerRoutes(this.pageIndex, downloadPageSize)
      .subscribe((data: any) => {
        this.acquirerRouteToDownload = data['data']['routingRules'];
        for (
          let index = 0;
          index < this.acquirerRouteToDownload.length;
          index++
        ) {
          dataToDownload.push([]);
          dataToDownload[index]['Default DS'] = this.clean('default_ds', index);
          dataToDownload[index]['Rule Type'] = this.clean('rule', index);
          dataToDownload[index]['Use Default'] =
            this.acquirerRouteToDownload[index]['use_default'] === 1
              ? 'True'
              : 'False';
        }
        console.log('dataToDownload In Exxport Users', dataToDownload);
        this.exportRecords(dataToDownload);
      });
  }
  exportRecords(dataToDownload: any[]) {
    const headers = ['Default DS', 'Rule Type', 'Use Default'];
    this.fileGenerationService.generateCSV(
      dataToDownload,
      headers,
      'Acquirer Routes'
    );
    this.fileGenerationService.onDownloadCompleted.next(true);
  }
  clean(key: string, index: number) {
    return this.acquirerRouteToDownload[index][key]
      ? this.acquirerRouteToDownload[index][key]
      : '';
  }

  onRefreshData(pageParams: { pageIndex: number; pageSize: number }) {
    this.pageIndex = pageParams.pageIndex;
    this.pageSize = pageParams.pageSize;

    this.getAcquirerRoutes();
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

  reset() {}
}
