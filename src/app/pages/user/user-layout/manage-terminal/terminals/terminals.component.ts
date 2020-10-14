import { PaginationService } from 'src/app/core/pagination.service';
import { ITerminal } from './../../../../shared/interfaces/terminals.model';
import { TerminalsService } from './../../../../shared/services/terminals.service';
// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-terminals',
  templateUrl: './terminals.component.html',
  styleUrls: ['./terminals.component.scss'],
})
export class TerminalsComponent implements OnInit {
  showFilter: boolean;
  searchForm: FormGroup;
  createTerminalForm: FormGroup;
  isCSVLoading: boolean;
  isUserCreating: boolean;

  allTerminals: ITerminal[];

  pageIndex: number;
  pageSize: number;
  dataCount: number;
  isLoaded = false;

  // filter params
  terminalId = '';

  constructor(
    private formBuilder: FormBuilder,
    private terminals: TerminalsService,
    private paginationService: PaginationService
  ) { }

  getTerminals() {
    this.isLoaded = false;
    this.terminals.getAllTerminals(this.pageIndex, this.pageSize, this.terminalId).subscribe(
      data => {
        this.allTerminals = data.content;
        this.dataCount = data.totalElements;
        this.isLoaded = true;

        this.paginationService.changePagerState.next(true);
      },
      error => {
        this.isLoaded = true;
        this.paginationService.changePagerState.next(false);
      }
    );
  }

  requestPageSize(value: number) {
    this.pageSize = value;
    this.getTerminals();
  }

  onRefreshData(payload: { pageIndex: number, pageSize: number }) {
    this.pageIndex = payload.pageIndex;
    this.pageSize = payload.pageSize;

    this.getTerminals();
  }

  reset() {}

  generateCSV() {}

  createUser(value) {}

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      terminalId: ['']
    });
    this.createTerminalForm = this.formBuilder.group({
      merchantId: ['', Validators.required],
      terminalId: ['', Validators.required],
    });
  }

  searchBy() {
    const terminalId = this.searchForm.value.terminalId || '';
    this.terminalId = terminalId;
    this.showFilter = false;

    // this.pageIndex = 0;

    this.getTerminals();
  }

  clearFilters() {
    this.showFilter = false;
    this.terminalId = '';
    this.searchForm.reset();

    this.getTerminals();
  }

  ngOnInit() {

    this.showFilter = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;

    this.pageSize = 10;
    this.pageIndex = 0;

    this.initializeForm();
    this.getTerminals();
  }

}
