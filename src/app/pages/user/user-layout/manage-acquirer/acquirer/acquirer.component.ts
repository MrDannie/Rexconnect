import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';

@Component({
  selector: 'app-acquirer',
  templateUrl: './acquirer.component.html',
  styleUrls: ['./acquirer.component.scss'],
})
export class AcquirerComponent implements OnInit {
  createAcquirerForm: FormGroup;
  showFilter: boolean;
  isCSVLoading: boolean;
  isUserCreating: boolean;
  searchForm: FormGroup;

  //component specific data
  allAcquirer: any;
  dataCount: number = 0;

  // Booalean and loaders
  isLoaded: boolean;
  isLoading: boolean;

  // PAgination
  pageIndex: number;
  pageSize: number;
  isRefreshing: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private acquirerService: AcquirerService,
    private alertService: AlertService,
    private paginationService: PaginationService
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

    // GET ALL ACQUIRERS
    this.getAllAcquirers();

    // GET PTSPS
    this.getPtsts();
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      acquirerName: '',
      cbnCode: '',
    });
    this.createAcquirerForm = this.formBuilder.group({
      clientName: ['', Validators.compose([Validators.required])],
      bankCode: ['', Validators.compose([Validators.required])],
      // acquirerTeminalPrefix: ['', Validators.compose([Validators.required])],
      clientLocation: ['', Validators.compose([Validators.required])],
      clientAddress: ['', Validators.compose([Validators.required])],
      ptsps: ['', Validators.compose([Validators.required])],
      routingRules: ['', Validators.compose([Validators.required])],
    });
  }

  // GET ALL ACQUIRER
  getAllAcquirers() {
    this.acquirerService
      .getAllAcquirer(this.pageIndex, this.pageSize)
      .subscribe(
        (response) => {
          console.log('Acquirers Data', response);
          this.allAcquirer = response['data']['clients'];
          this.dataCount = response['data']['count'];
          this.isLoaded = true;
          this.isLoading = false;
          this.isRefreshing = false;

          // Handling Pagination
          this.paginationService.pagerState.next({
            totalElements: this.dataCount,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          });
          console.log('Aquirers', this.allAcquirer);
        },
        (error) => {
          console.log('Error getting aquirer', error);
          this.alertService.error(error);
          this.isLoaded = true;
          this.isLoading = false;
          this.paginationService.pagerState.next(null);
        }
      );
  }

  // GET PTSPS
  getPtsts() {
    this.acquirerService
      .getPtspsList()
      .subscribe((response) => console.log('PTSTS GOTTEN', response));
  }

  onRefreshData(pageParams: { pageIndex: number; pageSize: number }) {
    this.pageIndex = pageParams.pageIndex;
    this.pageSize = pageParams.pageSize;

    this.getAllAcquirers();
  }

  addAcquirer(formValue) {
    console.log(formValue);
  }

  reset() {}

  beginDownload() {}

  requestPageSize(data) {}

  refreshTableData() {
    this.showFilter = false;
    this.searchForm.reset();
    this.isRefreshing = true;

    this.pageIndex = 0;
    this.pageSize = 10;

    this.getAllAcquirers();
  }
}
