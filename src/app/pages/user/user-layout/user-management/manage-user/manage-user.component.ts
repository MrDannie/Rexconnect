// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'protractor';
import { AlertService } from 'src/app/core/alert/alert.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { AllRoles } from 'src/app/pages/shared/interfaces/AllRoles';
import { AllUsers } from 'src/app/pages/shared/interfaces/AllUsers';
import { IRole } from 'src/app/pages/shared/interfaces/Role';
import { IUser } from 'src/app/pages/shared/interfaces/user';
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

  constructor(
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private paginationService: PaginationService,
    private alertService: AlertService
  ) {}
  getAllUsers() {
    this.isLoading = true;
    this.isLoaded = false;
    this.userManagementService
      .getAllUsers(this.pageIndex, this.pageSize)
      .subscribe(
        (response: AllUsers) => {
          this.allUsers = response['content'];
          this.dataCount = response['totalElements'];
          this.originalResponse = response;

          this.isLoaded = true;

          this.pagedItems = this.allUsers;
          this.isLoading = false;
          this.paginationService.changePagerState.next(true);
        },
        (error) => {
          this.isLoaded = true;
          this.paginationService.changePagerState.next(false);
          console.error('error occurred: ', error);
        }
      );
  }

  ngOnInit() {
    this.showFilter = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;
    this.isLoading = false;
    this.pages = [];
    this.initializeForm();
    this.getAllUsers();
    this.getUsersRoles('MERCHANT');
  }

  onRefreshData(pageParams: { pageIndex: number, pageSize: number }) {
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

    console.log(userDetails);
    this.userManagementService.createUser(userDetails).subscribe(
      (response: IUser) => {
        this.alertService.success('Created Successfully', true);
        $('#createUser').modal('hide');
        console.log('User Gotten IN component', response);
      },
      (error) => {
        console.log('Error Occured in Adding user', error);
      }
    );
  }

  deleteUser(userId) {
    this.userManagementService.deleteUser(userId).subscribe(
      (response: boolean) => {
        this.alertService.success('Deleted Successfully', true);
        $('#deleteUser').modal('hide');
        console.log('response after delete', response);
      },
      (error) => {
        console.log('Error Occured in Deleting user', error);
      }
    );
  }

  initializeEditForm(userId) {
    this.userToBeUpdated = userId;
    console.log(userId);
    this.userManagementService.getSingleUser(userId).subscribe((response) => {
      console.log('COMP: SINGLE USER', response);
      const { firstName, surname, username, email, role, roleId } = response;
      this.editUserForm.patchValue({
        firstName,
        surname,
        username,
        email,
        roleId,
      });
    });
  }

  initializeDeleteModal(user) {
    this.userToBeDeleted = user;
  }

  editUser(updatedUser) {
    console.log('Edited Values', updatedUser);

    this.userManagementService
      .updateUser(this.userToBeUpdated, updatedUser)
      .subscribe(
        (response: IUser) => {
          console.log('UPDATED USER IN COMPONENET', response);
        },
        (error) => {
          console.log('ERROR IN UPDATING USER', error);
        }
      );
  }

  initializeForm() {
    this.searchForm = this.formBuilder.group({
      firstname: '',
      lastname: '',
      role: '',
    });
    this.createUserForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      roleId: ['', Validators.compose([Validators.required])],
    });

    this.editUserForm = this.formBuilder.group({
      firstName: ['', Validators.compose([Validators.required])],
      surname: ['', Validators.compose([Validators.required])],
      username: ['', Validators.compose([Validators.required])],
      email: ['', Validators.compose([Validators.required])],
      roleId: ['', Validators.compose([Validators.required])],
    });

    this.pageSizeForm = this.formBuilder.group({
      pageSize: ['10'],
    });
  }

  // request by page size
  requestPageSize(value: number) {
    this.pageSize = value;
    this.getAllUsers();
  }
}
