import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';
import { FileGenerationService } from 'src/app/pages/shared/services/file-generation.service';
import { UserManagementService } from 'src/app/pages/shared/services/user-management.service';

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
  isFiltering: boolean;
  // allAcquirer: any;

  constructor(
    private formBuilder: FormBuilder,
    private acquirerService: AcquirerService,
    private alertService: AlertService,
    private paginationService: PaginationService,
    private userManagementService: UserManagementService,
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

    // GET ALL ACQUIRERS
    this.getAllAcquirers();

    // GET PTSPS
    this.getPtsts();
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      clientName: '',
      bankCode: '',
      status: '',
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
  getAllAcquirers(clientName?, bankCode?, status?) {
    this.acquirerService
      .getAllAcquirer(
        this.pageIndex,
        this.pageSize,
        clientName,
        bankCode,
        status
      )
      .subscribe(
        (response) => {
          console.log('Acquirers Data', response);
          this.allAcquirer = response['data']['content'];
          this.dataCount = response['data']['totalElements'];
          this.isLoaded = true;
          this.isLoading = false;
          this.isRefreshing = false;
          this.isFiltering = false;
          this.showFilter = false;

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
          this.isFiltering = false;
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

  addAcquirer(formValue) {
    console.log(formValue);
  }

  filterBy(value) {
    console.log('FILTER', this.searchForm.value);
    console.log(value);
    this.isFiltering = true;

    let { clientName, bankCode, status } = value;

    if (!value.clientName) {
      delete value.clientName;
      clientName = '';
    } else {
      clientName = value.clientName;
    }
    if (!value.bankCode) {
      delete value.bankCode;
      bankCode = '';
    } else {
      bankCode = value.bankCode;
    }
    if (!value.status) {
      delete value.status;
      status = '';
    } else {
      status = value.status;
    }

    this.getAllAcquirers(clientName, bankCode, status);
  }

  clearFilters() {
    this.showFilter = false;

    this.searchForm.reset();

    this.pageIndex = 0;
    this.pageSize = 10;

    this.getAllAcquirers();
  }

  reset() {}

  beginDownload() {
    this.exportUsers();
  }
  exportUsers() {
    const dataToDownload: any[] = [];
    // const currentPageSize = this.pageSize;

    // const downloadPageSize = this.dataCount;
    this.isCSVLoading = true;

    this.pageIndex = 0;

    for (let index = 0; index < this.allAcquirer.length; index++) {
      dataToDownload.push([]);
      dataToDownload[index]['Acquirer Name'] = this.clean('clientName', index);
      dataToDownload[index]['CBN Code'] = this.clean('bankCode', index);
      dataToDownload[index]['Status'] =
        this.allAcquirer[index]['status'] === 'ACTIVE' ? 'Active' : 'Inactive';
    }
    console.log('dataToDownload In Exxport Users', dataToDownload);
    this.exportRecords(dataToDownload);
  }

  exportRecords(dataToDownload: any[]) {
    const headers = ['Acquirer Name', 'Cbn Code', 'Status'];
    this.fileGenerationService.generateCSV(
      dataToDownload,
      headers,
      'Acquirers'
    );
    this.fileGenerationService.onDownloadCompleted.next(true);
    this.isCSVLoading = false;
  }
  clean(key: string, index: number): any {
    return this.allAcquirer[index][key] ? this.allAcquirer[index][key] : '';
  }

  requestPageSize(value: number) {
    console.log('afdasdfasdf');
    this.pageSize = value;
    this.getAllAcquirers();
  }

  onRefreshData(payload: { pageIndex: number; pageSize: number }) {
    console.log('adfadsf', payload);

    this.pageIndex = payload.pageIndex;
    this.pageSize = payload.pageSize;

    this.getAllAcquirers();
  }

  refreshTableData() {
    this.showFilter = false;
    this.searchForm.reset();
    this.isRefreshing = true;

    this.pageIndex = 0;
    this.pageSize = 10;

    this.getAllAcquirers();
  }
}
