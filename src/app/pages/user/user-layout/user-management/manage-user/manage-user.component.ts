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
  dataCount: any;
  createUserForm: FormGroup;
  userRoles: AllRoles;
  listOfMerchantRoles: IRole[];
  ngForArray: number[];

  constructor(
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private paginationService: PaginationService
  ) {}
  getAllUsers() {}

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
    this.ngForArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }

  previousPage(page) {}
  getPage(page) {}

  nextPage(page) {}

  getUsersRoles(category) {}

  // updateSelectedUserRole(e){
  //   this.selectedUserRole = e;
  //   this.
  // }
  reset() {}

  generateCSV() {}

  createUser(userDetails) {}

  initializeEditForm(userId) {}

  editUser(updatedUser) {}

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

  setPageSize(value: number) {}
}
