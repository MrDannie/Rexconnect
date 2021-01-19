import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { FileGenerationService } from 'src/app/pages/shared/services/file-generation.service';
import { RouteComponentService } from 'src/app/pages/shared/services/route-component.service';

@Component({
  selector: 'app-acquirer-ptsps',
  templateUrl: './acquirer-ptsps.component.html',
  styleUrls: ['./acquirer-ptsps.component.scss'],
})
export class AcquirerPtspsComponent implements OnInit {
  pageSize: number;
  pageIndex: number;
  acquirerPtsps: any;
  dataCount: any;
  isLoaded: boolean;
  isLoading: boolean;
  acquirerPtspsToDownload: any;

  constructor(
    private routingCompService: RouteComponentService,
    private paginationService: PaginationService,
    private alertService: AlertService,
    private fileGenerationService: FileGenerationService
  ) {}

  ngOnInit() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.getAcquirerPtsps();
  }
  getAcquirerPtsps() {
    this.routingCompService
      .getAcquirerPtsps(this.pageSize, this.pageSize)
      .subscribe(
        (response) => {
          console.log('fsda', response);
          this.acquirerPtsps = response['data']['ptsps'];
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
    this.getAcquirerPtsps();
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
      .getAcquirerPtsps(this.pageIndex, downloadPageSize)
      .subscribe((data: any) => {
        this.acquirerPtspsToDownload = data['data']['ptsps'];

        for (
          let index = 0;
          index < this.acquirerPtspsToDownload.length;
          index++
        ) {
          dataToDownload.push([]);
          dataToDownload[index]['Ptsps Name'] = this.clean('Ptspname', index);
          dataToDownload[index]['Ptsps Code'] = this.clean('PtspCode', index);
          dataToDownload[index]['Ptsps CTMK'] = this.clean('Ptspctmk', index);
          dataToDownload[index]['Ptsps CTMK Kcv'] = this.clean(
            'Ptspctmkkcv',
            index
          );
          dataToDownload[index]['Status'] = this.acquirerPtspsToDownload[index][
            'isActive'
          ]
            ? 'Active'
            : 'Inactive';
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
    return this.acquirerPtspsToDownload[index][key]
      ? this.acquirerPtspsToDownload[index][key]
      : '';
  }
}
