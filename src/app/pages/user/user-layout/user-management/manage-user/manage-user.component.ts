// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'protractor';
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
  isUserCreating: boolean;
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
  isSubmiting: boolean;
  validationMessage: any;
  userRecordsToDownload: any;

  constructor(
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private paginationService: PaginationService,
    private alertService: AlertService,
    private validationMessages: ValidationService,
    private fileGenerationService: FileGenerationService
  ) {
    this.validationMessage = validationMessages;
  }
  getAllUsers(
    firstName: string = '',
    lastName: string = '',
    roleId: number = null
  ) {
    this.isLoading = true;
    this.userManagementService
      .getAllUsers(this.pageIndex, this.pageSize, firstName, lastName, roleId)
      .subscribe(
        (response: AllUsers) => {
          this.allUsers = response['content'];
          this.dataCount = response['totalElements'];
          this.originalResponse = response;
          this.isLoaded = true;
          this.isLoading = false;

          this.paginationService.pagerState.next({
            totalElements: this.dataCount,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
          });

          // this.pagedItems = this.allUsers;

          // this.paginationService.changePagerState.next(true);
        },
        (error) => {
          this.isLoaded = true;
          this.isLoading = false;
          this.paginationService.pagerState.next(null);
          // this.paginationService.changePagerState.next(false);
          console.error('error occurred: ', error);
        }
      );
  }

  ngOnInit() {
    this.showFilter = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;
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
        // this.listOfMerchantRoles = this.userRoles.map(function (
        //   role
        // ) {
        //   return role.name;
        // });
        console.log('list', this.listOfMerchantRoles);
      },
      (error) => {}
    );
  }

  // updateSelectedUserRole(e){
  //   this.selectedUserRole = e;
  //   this.
  // }
  reset() {}

  generateCSV() {}

  createUser(userDetails) {
    this.isLoading = true; //TODO:
    // console.log(userDetails);
    this.userManagementService.createUser(userDetails).subscribe(
      (response: IUser) => {
        this.getAllUsers();
        $('#createUser').modal('hide');
        this.isLoading = false;
        console.log('User Gotten IN component', response);
        this.alertService.success('Created Successfully', true);
      },
      (error) => {
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
    this.pageIndex = 0;

    this.userManagementService
      .getAllUsers(this.pageIndex, downloadPageSize)
      .subscribe((data: any) => {
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
      });
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
    this.isSubmiting = true;
    this.userManagementService.deleteUser(userId).subscribe(
      (response: boolean) => {
        $('#deleteUser').modal('hide');
        this.getAllUsers();
        this.isSubmiting = false;
        console.log('response after delete', response);
        this.alertService.success('Deleted Successfully', true);
      },
      (error) => {
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

    // this.userManagementService.getSingleUser(userId).subscribe(
    //   (response) => {
    //     console.log('COMP: SINGLE USER', response);
    //     const { firstName, surname, username, email, roleId } = response;
    //     this.editUserForm.patchValue({
    //       firstName,
    //       surname,
    //       username,
    //       email,
    //       roleId,
    //     });
    //   },
    //   (error) => {
    //     console.log('COULD NOT GET SINGLE USER', error);
    //   }
    // );
  }

  initializeDeleteModal(user) {
    this.userToBeDeleted = user;
  }

  editUser(updatedUser) {
    this.isSubmiting = true;
    console.log('Edited Values', updatedUser);

    this.userManagementService
      .updateUser(this.userToBeUpdated, updatedUser)
      .subscribe(
        (response: IUser) => {
          this.getAllUsers();
          $('#editUser').modal('hide');
          this.isLoading = false;
          this.isSubmiting = false;
          console.log('UPDATED USER IN COMPONENET', response);
        },
        (error) => {
          console.log('ERROR IN UPDATING USER', error);
        }
      );
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      firstName: '',
      lastName: '',
      roleId: '',
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

  searchBy(filterByValues) {
    console.log(filterByValues);
    this.showFilter = false;
    const { firstName, lastName, roleId } = filterByValues;
    this.getAllUsers(firstName, lastName, roleId);
    console.log(firstName, lastName, roleId);

    // const firstName = this.searchForm.get('firstName').value || '';
    // if (firstName) {
    // }
  }

  // request by page size
  requestPageSize(value: number) {
    this.pageSize = value;
    this.getAllUsers();
  }
}
