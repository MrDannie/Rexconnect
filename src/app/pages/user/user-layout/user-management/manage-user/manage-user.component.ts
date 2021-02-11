// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { ValidationService } from 'src/app/core/validation.service';
import { AllRoles } from 'src/app/pages/shared/interfaces/AllRoles';
import { AllUsers } from 'src/app/pages/shared/interfaces/AllUsers';
import { IRole } from 'src/app/pages/shared/interfaces/Role';
import { IUser } from 'src/app/pages/shared/interfaces/user';
import { FileGenerationService } from 'src/app/pages/shared/services/file-generation.service';
// import { AllUsers } from 'src/app/pages/shared/interfaces/AllUsers';
import { UserManagementService } from 'src/app/pages/shared/services/user-management.service';
import { ErrorHandler } from './../../../../shared/services/error-handler.service';

declare var $: any;

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss'],
})
export class ManageUserComponent implements OnInit {
  showFilter: boolean;
  searchForm: FormGroup;
  createTerminalForm: FormGroup;
  isCSVLoading: boolean;
  // isUserCreating: boolean;
  editUserForm: FormGroup;
  allUsers: IUser[];
  originalResponse: AllUsers;
  userToBeUpdated: number;

  // PAGINATION
  pageIndex: number;
  pageSize: number;
  currentPage: number;
  pages: any[];
  isLoading: boolean; //for pagiantion
  pager: any;
  pagedItems: IUser[];
  pageSizeForm: FormGroup;
  dataCount = 0;
  createUserForm: FormGroup;
  userRoles: AllRoles;
  listOfMerchantRoles: IRole[];
  userToBeDeleted: any;
  isLoaded = false;
  validationMessage: any;
  userRecordsToDownload: any;

  isFiltering: any = false;

  constructor(
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private paginationService: PaginationService,
    private alertService: AlertService,
    private validationMessages: ValidationService,
    private fileGenerationService: FileGenerationService,
    private errorHandler: ErrorHandler
  ) {
    this.validationMessage = validationMessages;
  }
  getAllUsers(username?, email?, enabled?) {
    this.isLoading = true;
    this.userManagementService
      .getAllUsers(this.pageIndex, this.pageSize, username, email, enabled)
      .subscribe(
        (response: AllUsers) => {
          this.allUsers = response['content'];
          this.dataCount = response['totalElements'];
          this.originalResponse = response;
          this.isLoaded = true;
          this.isLoading = false;
          this.isFiltering = false;
          this.showFilter = false;

          this.paginationService.pagerState.next({
            totalElements: this.dataCount,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          });
        },
        (error) => {
          this.isLoaded = true;
          this.isLoading = false;
          this.isFiltering = false;
          this.paginationService.pagerState.next(null);
          // this.paginationService.changePagerState.next(false);
          console.error('error occurred: ', error);
          this.alertService.error(error);
        }
      );
  }

  ngOnInit() {
    this.showFilter = false;
    this.isCSVLoading = false;
    // this.isUserCreating = false;
    // this.isLoading = false;
    this.pageSize = 10;
    this.pageIndex = 0;

    this.initializeForm();
    this.getAllUsers();
    this.getUsersRoles('MERCHANT');
  }

  onRefreshData(pageParams: { pageIndex: number; pageSize: number }) {
    this.pageIndex = pageParams.pageIndex;
    this.pageSize = pageParams.pageSize;

    this.getAllUsers();
  }

  getUsersRoles(category) {
    this.userManagementService.getUsersRoles(category).subscribe(
      (response: AllRoles) => {
        console.log('ROLES', response);
        this.userRoles = response;
        this.listOfMerchantRoles = response['content'];
        console.log('list', this.listOfMerchantRoles);
      },
      (e) => {
        this.errorHandler.customClientErrors(
          'Unable to get users',
          e.error.error.code,
          e.error.error.responseMessage
        );
        this.paginationService.pagerState.next(null);
      }
    );
  }

  createUser(userDetails) {
    this.isLoading = true;
    this.userManagementService.createUser(userDetails).subscribe(
      (response: IUser) => {
        this.getAllUsers();
        $('#createUser').modal('hide');
        this.isLoading = false;
        console.log('User Gotten IN component', response);
        this.createUserForm.reset();
        this.alertService.success('User Created Successfully', true);
      },
      (error) => {
        this.isLoading = false;
        this.errorHandler.customClientErrors(
          'Unable to create user',
          error.error.error.code,
          error.error.error.responseMessage
        );
        console.log('Error Occured in Adding user', error);
      }
    );
  }

  beginDownload() {
    this.exportUsers();
  }
  exportUsers() {
    const dataToDownload: any[] = [];
    // const currentPageSize = this.pageSize;

    const downloadPageSize = this.dataCount;

    // this.pageIndex = 0;
    this.userManagementService
      .getAllUsers(
        0,
        downloadPageSize,
        this.searchForm.value.username,
        this.searchForm.value.email,
        this.searchForm.value.enabled
      )
      .subscribe(
        (data: any) => {
          this.userRecordsToDownload = data['content'];

          for (
            let index = 0;
            index < this.userRecordsToDownload.length;
            index++
          ) {
            dataToDownload.push([]);
            dataToDownload[index]['Username'] = this.clean('username', index);
            dataToDownload[index]['Email'] = this.clean('email', index);
            dataToDownload[index]['Status'] = this.userRecordsToDownload[index][
              'enabled'
            ]
              ? 'Active'
              : 'Inactive';
          }
          console.log('dataToDownload In Exxport Users', dataToDownload);
          this.exportRecords(dataToDownload);
        },
        (error) => {
          this.alertService.error(error);
        }
      );
  }

  exportRecords(dataToDownload: any[]) {
    const headers = ['Username', 'Email', 'Status'];
    this.fileGenerationService.generateCSV(dataToDownload, headers, 'My Users');
    this.fileGenerationService.onDownloadCompleted.next(true);
  }

  clean(key: string, index: number) {
    return this.userRecordsToDownload[index][key]
      ? this.userRecordsToDownload[index][key]
      : '';
  }

  deleteUser(userId) {
    this.isLoading = true;
    this.userManagementService.deleteUser(userId).subscribe(
      (response: boolean) => {
        $('#deleteUser').modal('hide');
        this.getAllUsers();
        this.isLoading = false;
        console.log('response after delete', response);
        this.alertService.success('Deleted Successfully', true);
      },
      (error) => {
        this.isLoading = false;
        this.errorHandler.customClientErrors(
          'Unable to delete user',
          error.error.error.code,
          error.error.error.responseMessage
        );
        console.log('Error Occured in Deleting user', error);
      }
    );
  }

  initializeEditForm(userId) {
    this.userToBeUpdated = userId;
    console.log(userId);
    const {
      firstName,
      surname,
      username,
      email,
      roleId,
    } = this.allUsers.filter((user) => user.id === userId)[0];
    this.editUserForm.patchValue({
      firstName,
      surname,
      username,
      email,
      roleId,
    });

    this.userManagementService.getSingleUser(userId).subscribe(
      (response) => {
        console.log('COMP: SINGLE USER', response);
        const { firstName, surname, username, email, roleId } = response;
        this.editUserForm.patchValue({
          firstName,
          surname,
          username,
          email,
          roleId,
        });
      },
      (error) => {
        console.log('COULD NOT GET SINGLE USER', error);
      }
    );
  }

  initializeDeleteModal(user) {
    this.userToBeDeleted = user;
  }

  editUser(updatedUser) {
    this.isLoading = true;
    console.log('Edited Values', updatedUser);

    this.userManagementService
      .updateUser(this.userToBeUpdated, updatedUser)
      .subscribe(
        (response: IUser) => {
          this.getAllUsers();
          $('#editUser').modal('hide');
          this.isLoading = false;
          this.alertService.success('User Updated Successfully', true);
          console.log('UPDATED USER IN COMPONENET', response);
        },
        (error) => {
          this.isLoading = false;
          this.errorHandler.customClientErrors(
            'Unable to create user',
            error.error.error.code,
            error.error.error.responseMessage
          );
          console.log('ERROR IN UPDATING USER', error);
        }
      );
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      username: '',
      email: '',
      enabled: '',
    });
    this.createUserForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required])],
      firstName: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      roleId: ['', Validators.compose([Validators.required])],
    });

    this.editUserForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      username: [Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      roleId: ['', Validators.compose([Validators.required])],
    });

    this.pageSizeForm = this.formBuilder.group({
      pageSize: ['10'],
    });
  }

  searchBy(value) {
    this.pageIndex = 0;

    console.log(value);
    this.isFiltering = true;

    let { username, email, enabled } = value;

    if (!value.username) {
      delete value.username;
      username = '';
    } else {
      username = value.username;
    }
    if (!value.email) {
      delete value.email;
      email = '';
    } else {
      email = value.email;
    }
    if (!value.enabled) {
      delete value.enabled;
      enabled = '';
    } else {
      enabled = value.enabled;
    }

    // this.pageIndex = 0;
    // this.currentPage = 1;
    this.getAllUsers(username, email, enabled);
  }

  // request by page size
  requestPageSize(value: number) {
    this.pageSize = value;
    this.getAllUsers();
  }

  refreshTableData() {
    this.showFilter = false;
    this.searchForm.reset();

    this.pageIndex = 0;
    this.pageSize = 10;

    this.getAllUsers();
  }

  showUsernamePopupMessage() {
    console.log('popup');
    const popup = document.getElementById('myPopup');
    popup.classList.toggle('show');
  }

  showEmailPopupMessage() {
    console.log('popup');
    const popup = document.getElementById('emailPopup');
    popup.classList.toggle('show');
  }
}
