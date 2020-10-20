// tslint:disable
import { PaginationService } from './../../../../core/pagination.service';
import { FormBuilder } from '@angular/forms';

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface PagerContent {
  pageIndex: number;
  totalElements: number;
  pageSize: number;
  currentPage?: number;
}

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

    if (this.totalElements == 0) {
      return;
    }

    this.refreshData.emit({ pageIndex: this.pageIndex, pageSize: this.pageSize })
  }

  // this method reduces the current page and pageIndex, and emits new data based on the new values.
  previousPage() {
    if (this.totalElements == 0) {
      return;
    }

    const index = this.pageIndex - 1;
    this.refreshData.emit({ pageIndex: index, pageSize: this.pageSize })
  }

  // this method calculates the values for the page index and the current page and emits the new values.
  getPage(page) {

    const index = page - 1;

    this.refreshData.emit({ pageIndex: index, pageSize: this.pageSize })
  }

  // this method increases the current page and pageIndex, and emits new data based on the new values.
  nextPage() {

    const index = this.pageIndex + 1;

    this.refreshData.emit({ pageIndex: index, pageSize: this.pageSize })
  }

  // this method initializes the pager object to display the pages using the passed in  totalElements, the current page and page size.
  initPages() {
    this.pager = this.paginationService.getPager(this.totalElements ? this.totalElements : 0, this.pageIndex + 1, this.pageSize);
    this.pagedItems = this.data;
  }

  ngOnInit() {
    this.initForm();
    this.pageSize = 10;
    this.pageIndex = 0;
    this.currentPage = 1;
    this.initPages();

    this.paginationService.pagerState.subscribe((state: PagerContent) => {
      if (state) {

        this.totalElements = state.totalElements;
        this.pageIndex = state.pageIndex;
        this.pageSize = state.pageSize;
        this.currentPage = this.pageIndex + 1;

        this.initPages();
      }
    })

  }

}
