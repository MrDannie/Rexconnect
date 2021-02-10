import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { StationsService } from '../stations.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

declare var $: any;
@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss'],
})
export class StationsComponent implements OnInit {
  @ViewChild('setPageSizeId') setPageSizeId: ElementRef;

  //Forms
  createStationForm: FormGroup;
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
  allStations: any;
  dataCount: any;
  selectedValue: any;

  constructor(
    private formBuilder: FormBuilder,
    private stationsService: StationsService,
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
    this.getAllStations();
    this.setPageSizeId.nativeElement.value = this.pageSize;
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      name: '',
      status: '',
    });
    this.createStationForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      zmk: ['', Validators.compose([Validators.required])],
      zpk: ['', Validators.compose([Validators.required])],
      // status: ['', Validators.compose([Validators.required])],
      channelHost: ['', Validators.compose([Validators.required])],
      channelPort: ['', Validators.compose([Validators.required])],
      baseUrl: ['', Validators.compose([Validators.required])],
      authUsername: ['', Validators.compose([Validators.required])],
      authPassword: ['', Validators.compose([Validators.required])],
    });
  }

  createStation() {
    this.isCreating = true;
    this.stationsService.createStation(this.createStationForm.value).subscribe(
      (response) => {
        console.log(response);
        this.isCreating = false;
        this.createStationForm.reset();
        this.getAllStations();
        $('#createModal').modal('hide');

        this.alertService.success('Station created successfully', true);
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

  deleteStation() {
    this.isDeleting = true;
    this.stationsService.deleteStation(this.selectedValue.id).subscribe(
      (response) => {
        console.log(response);
        this.isDeleting = false;
        this.getAllStations();
        $('#confirmationModal').modal('hide');

        this.alertService.success('Station deleted successfully', true);
      },
      (error) => {
        this.isDeleting = false;
        this.alertService.error(error, false);
      }
    );
  }

  getAllStations() {
    console.log(this.pageIndex, this.pageSize);
    this.stationsService
      .getAllStations(this.pageIndex, this.pageSize, this.searchForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          this.allStations = res['data']['content'];
          this.dataCount = res['data']['totalElements'];
          console.log(this.dataCount, this.currentPage, this.pageSize);

          this.pager = this.paginationService.getPager(
            this.dataCount,
            this.currentPage,
            this.pageSize
          );
          console.log(this.pager);

          this.pagedItems = this.allStations;

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
    this.getAllStations();
  }

  getPage(page) {
    this.isLoading = true;
    this.pageIndex = page - 1;
    this.currentPage = page;
    this.getAllStations();
  }

  nextPage() {
    this.isLoading = true;
    this.pageIndex = Number(this.pageIndex);
    this.currentPage++;
    console.log(this.currentPage);
    this.getAllStations();
  }
  previousPage() {
    this.isLoading = true;
    this.pageIndex = Number(this.pageIndex);
    this.currentPage--;
    this.getAllStations();
  }

  setPageSize(size: number) {
    console.log(this.setPageSizeId);
    this.setPageSizeId.nativeElement.value = Number(size);
    this.isLoading = true;
    this.pageSize = Number(size);
    this.pageIndex = 0;
    this.currentPage = 1;
    this.getAllStations();
  }
  generateCSV() {
    this.isCSVLoading = true;

    this.stationsService.getAllStations(0, 100000).subscribe(
      (res) => {
        console.log(res);
        const exportData = JSON.parse(
          JSON.stringify(
            // res['data']['content'],
            this.allStations,
            ['name', 'zmk', 'zpk', 'lastEcho', 'lastZpkChange'],
            2
          )
        );
        console.log(exportData);
        const options = {
          headers: [
            'Station Name',
            'ZMK',
            'ZPK',
            'Last Echo Date',
            'Last Zpk Change',
          ],
          decimalseparator: '.',
          showTitle: false,
          nullToEmptyString: true,
        };
        this.isCSVLoading = false;
        return new Angular5Csv(exportData, 'Stations List', options);
      },
      (err) => {
        this.isCSVLoading = false;
        this.alertService.error(err, false);
      }
    );
  }
}
