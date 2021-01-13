import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { StationsService } from '../stations.service';
import { Angular5Csv } from "angular5-csv/dist/Angular5-csv";

@Component({
  selector: 'app-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.scss'],
})
export class StationsComponent implements OnInit {
  @ViewChild("setPageSizeId") setPageSizeId: ElementRef;

  //Forms
  createStationForm: FormGroup;
  searchForm: FormGroup;

  //Booleans/Loaders
  isCSVLoading: boolean;
  creatingStation: boolean;
  isLoading: boolean;
  showFilter: boolean;
  isRefreshing: boolean;



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

  constructor(private formBuilder: FormBuilder, private stationsService: StationsService,
     private paginationService: PaginationService, private alertService: AlertService) {
    this.isCSVLoading = false;
    this.creatingStation = false;
    this.showFilter = false;
    this.isLoading = true;
    this.isRefreshing = false;
    this.pageIndex = 0;
    this.pageSize = 2;
    this.pages = [];
    this.currentPage = 1;
    this.initializeForm();
  }

  ngOnInit() {
    this.getAllStations();
    this.setPageSizeId.nativeElement.value = this.pageSize;
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      stationName: '',
      stationAcquirer: '',
      stationId: '',
    });
    this.createStationForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }


  getAllStations() {
    console.log(this.pageIndex, this.pageSize);
    this.stationsService.getAllStations(this.pageIndex, this.pageSize).subscribe(
      (res) => {
        console.log(res);
        this.allStations = res["data"]['stations'];
        this.dataCount = this.allStations.length;
        this.pager = this.paginationService.getPager(
          this.dataCount,
          this.currentPage,
          this.pageSize
        );
        this.pagedItems = this.allStations;

        this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.alertService.error(error);
        this.isLoading = false;
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
    this.pageIndex = (page - 1);
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
          JSON.stringify(res["data"]['stations'], ["name", "zmk", "zpk", "lastEcho", "lastZpkChange"], 2)
        );
        console.log(exportData);
        const options = {
          headers: ["Station Name", "ZMK", "ZPK", "Last Echo Date", "Last Zpk Change"],
          decimalseparator: ".",
          showTitle: false,
          nullToEmptyString: true,
        };
        this.isCSVLoading = false;
        return new Angular5Csv(exportData, "Stations List", options);
      },
      (err) => {
        this.isCSVLoading = false;
        this.alertService.error(err, false);
      }
    );
  }
}
