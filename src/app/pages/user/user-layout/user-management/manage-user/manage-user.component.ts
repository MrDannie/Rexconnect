// tslint:disable
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { error } from 'protractor';
import { PaginationService } from 'src/app/core/pagination.service';
import { AllRoles } from 'src/app/pages/shared/interfaces/AllRoles';
import { AllUsers } from 'src/app/pages/shared/interfaces/AllUsers';
import { IRole } from 'src/app/pages/shared/interfaces/Role';
import { IUser } from 'src/app/pages/shared/interfaces/User';
// import { AllUsers } from 'src/app/pages/shared/interfaces/AllUsers';
import { UserManagementService } from 'src/app/pages/shared/services/user-management.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private paginationService: PaginationService
  ) {}
  getAllUsers() {
    this.isLoading = true;
    this.userManagementService
      .getAllUsers(this.pageIndex, this.pageSize)
      .subscribe(
        (response: AllUsers) => {
          console.log('Users GOtten', response);
          this.allUsers = response['content'];
          this.dataCount = response['totalElements'];
          this.originalResponse = response;

          //PAGINATION CONTENT
          this.pager = this.paginationService.getPager(
            response['totalElements'], //TODO:
            this.pageIndex, //TODO:
            this.pageSize
          );
          console.log('this. is pager', this.pager);

          this.pagedItems = this.allUsers;
          this.isLoading = false;
        },
        (error) => {
          console.log('ERROR IN GETTING USERS', error);
        }
      );
  }

  ngOnInit() {
    this.showFilter = false;
    this.isCSVLoading = false;
    this.isUserCreating = false;
    this.isLoading = false;
    this.pageSize = 10;
    this.pageIndex = 0;
    this.currentPage = 1;
    this.pages = [];
    this.initializeForm();
    this.getAllUsers();
    this.getUsersRoles('MERCHANT');
  }

  previousPage(page) {
    console.log('previous page', page);
    this.pageIndex = page - 2;
    this.getAllUsers();
    this.pageIndex = page - 1;
  }

  getPage(page) {
    console.log('page to go', page);
    console.log(this.pager);

    this.pageIndex = page - 1;
    // this.currentPage = page;
    this.getAllUsers();
    this.pageIndex = page;
  }

  nextPage(page) {
    console.log('next page', page);
    this.pageIndex = page;
    this.getAllUsers();
    this.pageIndex = page + 1;
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
        console.log('User Gotten IN component', response);
      },
      (error) => {
        console.log('Error Occured in Adding user', error);
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

  setPageSize(value: number) {
    console.log('page size: ' + value);
    this.pageSize = value;
    this.pageIndex = 0;
    this.currentPage = 1;
    this.getAllUsers();
  }
}
