// tslint:disable
import { PaginationService } from 'src/app/core/pagination.service';
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

  // download events
  @Output() onDownloadAsCSV = new EventEmitter<any>();

  @Input() data: any[];
  @Input() totalElements: number;

  pageIndex: number;
  pageSize: number;
  currentPage: number;
  pages: any[];
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

  onPageSizeChanged(newSize: number) {
    this.pageCountSelected.emit(newSize);
  }

  onPageSelected(page: number) {
    this.pageSelected.emit(page);
  }

  onPreviousPageSelected() {
    this.previousPageSelected.emit(this.pager.currentPage);
  }

  onNextPageSelected() {
    this.nextPageSelected.emit(this.pager.currentPage);
  }

  initPages() {
    this.pager = this.paginationService.getPager(this.totalElements, this.pageIndex, this.pageSize);
    this.pagedItems = this.data;
  }

  ngOnInit() {
    this.initForm();
    this.pageSize = 10;
    this.pageIndex = 0;
    this.currentPage = 1;
    this.initPages();
  }

}
