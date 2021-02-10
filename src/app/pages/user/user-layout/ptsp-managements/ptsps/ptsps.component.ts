import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { PtspsService } from '../ptsps.service';

declare var $: any;

@Component({
  selector: 'app-ptsps',
  templateUrl: './ptsps.component.html',
  styleUrls: ['./ptsps.component.scss'],
})
export class PtspsComponent implements OnInit {
  @ViewChild('setPageSizeId') setPageSizeId: ElementRef;

  //Forms
  createPtspForm: FormGroup;
  searchForm: FormGroup;

  //Booleans/Loaders
  isCSVLoading: boolean;
  isLoading: boolean;
  showFilter: boolean;
  isRefreshing: boolean;
  isCreating: boolean;
  isDeleting: boolean;
  isSearching: boolean;

  //pagination
  pager: any;
  pagedItems: any;
  pages: any;
  pageIndex: any;
  pageSize: any;
  currentPage: any;

  //component specific data
  allPtsps: any;
  dataCount: any;
  selectedValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private ptspService: PtspsService,
    private paginationService: PaginationService,
    private alertService: AlertService
  ) {
    this.isCSVLoading = false;
    this.showFilter = false;
    this.isRefreshing = false;
    this.pageIndex = 0;
    this.pageSize = 20;
    this.pages = [];
    this.currentPage = 1;
    this.initializeForm();
  }

  ngOnInit() {
    this.isLoading = true;
    this.isCreating = false;
    this.getAllPtsps();
    this.setPageSizeId.nativeElement.value = this.pageSize;
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      Ptspname: '',
      status: '',
    });
    this.createPtspForm = this.formBuilder.group({
      Ptspname: ['', Validators.compose([Validators.required])],
      Ptspctmk: ['', Validators.compose([Validators.required])],
      Ptspctmkblock: ['', Validators.compose([Validators.required])],
      // status: ['', Validators.compose([Validators.required])],
      PtspCode: ['', Validators.compose([Validators.required])],
      Ptspctmkblockkcv: ['', Validators.compose([Validators.required])],
      Ptspctmkkcv: ['', Validators.compose([Validators.required])],
    });
  }

  createPTSP() {
    this.isCreating = true;
    this.ptspService.createPTSP(this.createPtspForm.value).subscribe(
      (response) => {
        console.log(response);
        this.isCreating = false;
        this.createPtspForm.reset();
        this.getAllPtsps();
        $('#createModal').modal('hide');
        this.alertService.success('PTSP created successfully', true);
      },
      (error) => {
        this.isCreating = false;
        this.alertService.error(error, false);
      }
    );
  }

  warnUser(val) {
    console.log(val);
    this.selectedValue = val;
    $('#confirmationModal').modal('show');
  }

  deletePTSP() {
    this.isDeleting = true;
    this.ptspService.deletePTSP(this.selectedValue.id).subscribe(
      (response) => {
        console.log(response);
        this.isDeleting = false;
        this.getAllPtsps();
        $('#confirmationModal').modal('hide');
        this.alertService.success('PTSP deleted successfully', true);
      },
      (error) => {
        this.isDeleting = false;
        this.alertService.error(error, false);
      }
    );
  }

  getAllPtsps() {
    console.log(this.pageIndex, this.pageSize);
    this.ptspService
      .getAllPtsps(this.pageIndex, this.pageSize, this.searchForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.allPtsps = res['data']['content'];
          this.dataCount = res['data']['totalElements'];
          console.log(this.dataCount, this.currentPage, this.pageSize);

          this.pager = this.paginationService.getPager(
            this.dataCount,
            this.currentPage,
            this.pageSize
          );
          console.log(this.pager);

          this.pagedItems = this.allPtsps;

          this.isLoading = false;
          this.isSearching = false;
          this.isRefreshing = false;
          this.showFilter = false;
        },
        (error) => {
          console.log(error);
          this.alertService.error(error);
          this.isLoading = false;
          this.isSearching = false;
          this.isRefreshing = false;
        }
      );
  }

  /**
   * Pagination and export section
   */
  reset() {
    this.isRefreshing = true;
    this.pageIndex = 0;
    this.showFilter = false;
    this.pageSize = 20;
    this.setPageSizeId.nativeElement.value = 20;
    this.searchForm.reset();
    this.currentPage = 1;
    console.log(this.pageIndex);
    this.getAllPtsps();
  }

  getPage(page) {
    this.isLoading = true;
    this.pageIndex = page - 1;
    this.currentPage = page;
    this.getAllPtsps();
  }

  nextPage() {
    this.isLoading = true;
    this.pageIndex = Number(this.pageIndex);
    this.currentPage++;
    console.log(this.currentPage);
    this.getAllPtsps();
  }
  previousPage() {
    this.isLoading = true;
    this.pageIndex = Number(this.pageIndex);
    this.currentPage--;
    this.getAllPtsps();
  }

  setPageSize(size: number) {
    console.log(this.setPageSizeId);
    this.setPageSizeId.nativeElement.value = Number(size);
    this.isLoading = true;
    this.pageSize = Number(size);
    this.pageIndex = 0;
    this.currentPage = 1;
    this.getAllPtsps();
  }
  generateCSV() {
    this.isCSVLoading = true;
    const downloadPageSize = this.dataCount;

    this.ptspService
      .getAllPtsps(0, downloadPageSize, this.searchForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          const exportData = JSON.parse(
            JSON.stringify(
              this.allPtsps,
              // res['data']['ptsps'],
              [
                'Ptspname',
                'Ptspctmk',
                'Ptspctmkblock',
                'Ptspctmkkcv',
                'Ptspctmkblockkcv',
                'isActive',
              ],
              2
            )
          );
          console.log(exportData);
          const options = {
            headers: [
              'Name',
              'CTMK',
              'CTMK BLOCK',
              'CTMK KCV',
              'CTMK BLOCK KCV',
              'Status',
            ],
            decimalseparator: '.',
            showTitle: false,
            nullToEmptyString: true,
          };
          this.isCSVLoading = false;
          return new Angular5Csv(exportData, 'Ptsp List', options);
        },
        (err) => {
          this.isCSVLoading = false;
          this.alertService.error(err, false);
        }
      );
  }
}
