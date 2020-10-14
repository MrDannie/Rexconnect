// tslint:disable
import { PaginationService } from './../../../../core/pagination.service';
import { FormBuilder } from '@angular/forms';

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-rex-pagination',
  templateUrl: './rex-pagination.component.html',
  styleUrls: ['./rex-pagination.component.scss']
})
export class RexPaginationComponent implements OnInit {

  // page events

  @Output() previousPageSelected = new EventEmitter<number>();
  @Output() nextPageSelected = new EventEmitter<number>();
  @Output() pageSelected = new EventEmitter<number>();
  @Output() pageCountSelected = new EventEmitter<number>();
  @Output() refreshData = new EventEmitter<{pageSize: number, pageIndex: number}>();

  // download events
  @Output() onDownloadAsCSV = new EventEmitter<any>();

  @Input() data: any[];
  @Input() totalElements: number;

  pageIndex: number;
  pageSize: number;
  currentPage: number;
  pages: any[] = [];
  isLoading: boolean;
  pager: any;
  pagedItems: any[];
  pageSizeForm: FormGroup;
  dataCount: any;


  constructor(
    private fb: FormBuilder,
    private paginationService: PaginationService
  ) { }

  initForm() {
    this.pageSizeForm = this.fb.group({
      pageSize: ['10']
    })
  }

  // this method gets called when a new page size is selected, it in turn emits a new page size and current page index value to the parent component
  onPageSizeChanged(newSize: number) {
    this.pageSize = newSize;
    this.refreshData.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize })
  }

  // this method reduces the current page and pageIndex, and emits new data based on the new values.
  previousPage() {
    this.pageIndex--;
    this.currentPage--;
    this.refreshData.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize })
  }

  // this method calculates the values for the page index and the current page and emits the new values.
  getPage(page) {
    this.pageIndex = page - 1;
    this.currentPage = page;

    this.refreshData.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize })
  }

  // this method increases the current page and pageIndex, and emits new data based on the new values.
  nextPage() {
    this.pageIndex++;
    this.currentPage++;

    this.refreshData.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize })
  }

  // this method initializes the pager object to display the pages using the passed in  totalElements, the current page and page size.
  initPages() {
    this.pager = this.paginationService.getPager(this.totalElements, this.currentPage, this.pageSize);
    this.pagedItems = this.data;
  }

  // this method gets called whenever an error occurrs, it sets the pager to null, and also sets the total elements to 0
  errorOccurred() {
    this.pager = null;
    this.totalElements = 0;
  }

  ngOnInit() {
    this.initForm();
    this.pageSize = 10;
    this.pageIndex = 0;
    this.currentPage = 1;
    this.initPages();

    this.paginationService.changePagerState.subscribe((state: boolean) => {
      if (state) {
        this.initPages();
      } else {
        this.errorOccurred();
      }
    })

  }

}
