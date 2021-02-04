import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import { Subscription } from 'rxjs';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { TokenService } from 'src/app/pages/shared/services/token.service';
import { StationsService } from '../manage-stations/stations.service';
import { AuditLogService } from './audit-log.service';

@Component({
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.scss'],
})
export class AuditLogsComponent implements OnInit {
  @ViewChild('setPageSizeId') public setPageSizeId: ElementRef;

  // Forms
  public createStationForm: FormGroup;
  public searchForm: FormGroup;

  // Booleans/Loaders
  public isCSVLoading: boolean;
  public isLoading: boolean;
  public showFilter: boolean;
  public isRefreshing: boolean;
  public isCreating: boolean;
  public isDeleting: boolean;
  public isSearching: boolean;

  // pagination
  public pager: any;
  public pagedItems: any;
  public pages: any;
  public pageIndex: any;
  public pageSize: any;
  public currentPage: any;

  // component specific data
  public allStations: any;
  public dataCount: any;
  public selectedValue: any;

  constructor(private formBuilder: FormBuilder, private auditLogService: AuditLogService,
              private paginationService: PaginationService, private alertService: AlertService, private sig: TokenService) {

    this.isCSVLoading = false;
    this.showFilter = false;
    this.isRefreshing = false;
    this.pageIndex = 0;
    this.pageSize = 20;
    this.pages = [];
    this.currentPage = 1;
    this.initializeForm();
  }

  public ngOnInit() {
    this.isLoading = true;
    this.isCreating = false;
    this.getAllStations();
    this.setPageSizeId.nativeElement.value = this.pageSize;
  }

  public initializeForm() {
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

 
 



   public async getAllStations() {
    // console.log(this.pageIndex, this.pageSize);
    // this.auditLogService.getAuditLogs(this.pageIndex, this.pageSize, this.searchForm.value).subscribe(
    //   (res) => {
    //     console.log(res);
    //     // this.allStations = res['data'].stations;
    //     // this.dataCount = this.allStations.length;
    //     // console.log(this.dataCount, this.currentPage, this.pageSize);
    //     // this.pager = this.paginationService.getPager(
    //     //   this.dataCount,
    //     //   this.currentPage,
    //     //   this.pageSize,
    //     // );
    //     // console.log(this.pager);

    //     // this.pagedItems = this.allStations;

    //     // this.isLoading = false;
    //     // this.isSearching = false;
    //     // this.isRefreshing = false;
    //   },
    //   (error) => {
    //     console.log(error);
    //     this.isLoading = false;
    //     this.isSearching = false;
    //     this.isRefreshing = false;
    //     this.alertService.error(error);

    //   },
    // );
 const result = await this.sig.getAccessControlData('POST', 'htttpdsdds');
 console.log(result);
 
  }

  /**
   * Pagination and export section
   */
  public reset() {
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

  public getPage(page) {
    this.isLoading = true;
    this.pageIndex = (page - 1);
    this.currentPage = page;
    this.getAllStations();
  }

  public nextPage() {
    this.isLoading = true;
    this.pageIndex = Number(this.pageIndex);
    this.currentPage++;
    console.log(this.currentPage);
    this.getAllStations();

  }
  public previousPage() {
    this.isLoading = true;
    this.pageIndex = Number(this.pageIndex);
    this.currentPage--;
    this.getAllStations();

  }

  public setPageSize(size: number) {
    console.log(this.setPageSizeId);
    this.setPageSizeId.nativeElement.value = Number(size);
    this.isLoading = true;
    this.pageSize = Number(size);
    this.pageIndex = 0;
    this.currentPage = 1;
    this.getAllStations();
  }
  public generateCSV() {
    this.isCSVLoading = true;

    this.auditLogService.getAuditLogs(0, 100000).subscribe(
      (res) => {
        console.log(res);
        const exportData = JSON.parse(
          JSON.stringify(res['data'].stations, ['name', 'zmk', 'zpk', 'lastEcho', 'lastZpkChange'], 2),
        );
        console.log(exportData);
        const options = {
          headers: ['Station Name', 'ZMK', 'ZPK', 'Last Echo Date', 'Last Zpk Change'],
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
      },
    );
  }
}
