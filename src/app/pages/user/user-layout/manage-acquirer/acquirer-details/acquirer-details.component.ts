import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';

@Component({
  selector: 'app-acquirer-details',
  templateUrl: './acquirer-details.component.html',
  styleUrls: ['./acquirer-details.component.scss'],
})
export class AcquirerDetailsComponent implements OnInit {
  showFilter: boolean;
  expression: boolean;
  isCSVLoading;
  boolean;

  editAcquirerForm: any;

  // Component specific data
  acquirerId: any;
  acquirer: any;
  permissions: any;

  constructor(
    private formBuilder: FormBuilder,
    private acquirerService: AcquirerService,
    private route: ActivatedRoute,
    private storageService: StorageService
  ) {
    this.showFilter = false;
    this.expression = false;
    this.isCSVLoading = false;
    this.initializeForm();
  }

  ngOnInit() {
    this.acquirerId = this.route.snapshot.params.id;
    console.log('ACQUIRER ID', this.acquirerId);
    this.getSingleAcquirer(this.acquirerId);

    this.getPermissions();
  }

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
  }

  getSingleAcquirer(acquirerId) {
    this.acquirerService.getSingleAcquirer(acquirerId).subscribe((response) => {
      console.log('SINGLE ACQUIRER', response);
      this.acquirer = response['data'];

      console.log('SINGLE OVER', this.acquirer);
    });
  }

  initializeForm() {
    this.editAcquirerForm = this.formBuilder.group({
      merchantId: ['', Validators.compose([Validators.required])],
      terminalId: ['', Validators.compose([Validators.required])],
    });
  }

  reset() {}
  generateCSV() {}

  createUser(value) {}
}
