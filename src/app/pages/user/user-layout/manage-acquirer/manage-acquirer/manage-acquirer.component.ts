import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AcquirerService } from 'src/app/pages/shared/services/acquirer.service';
import { AlertService } from 'src/app/core/alert/alert.service';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
  countries,
  merchantCodes,
  currencies,
  states,
} from '../../../../../pages/shared/constants';
import { ProfileManagementService } from 'src/app/pages/shared/services/profile-management.service';
import { ValidationService } from '../../../../../core/validation.service';
import { MerchantsService } from 'src/app/pages/shared/services/merchants.service';
import { AllRoles } from 'src/app/pages/shared/interfaces/AllRoles';
import { IRole } from 'src/app/pages/shared/interfaces/Role';
import { UserManagementService } from 'src/app/pages/shared/services/user-management.service';
import { PaginationService } from 'src/app/core/pagination.service';
import { IUser } from 'src/app/pages/shared/interfaces/user';
declare var $: any;

@Component({
  selector: 'app-manage-acquirer',
  templateUrl: './manage-acquirer.component.html',
  styleUrls: ['./manage-acquirer.component.scss'],
})
export class ManageAcquirerComponent implements OnInit {
  notRouteComponent: boolean = true;
  acquirerId;
  acquirerName: any;
  disablingAcquirer: boolean = false;
  acquirerStatus: string = 'Active';
  createdAt: any;
  permissions: any;
  currentUrl: string;
  searchForm: FormGroup;
  createMerchantForm: FormGroup;
  merchantCategoryCodes: any;
  currencyCodes: any;
  countryCodes: any;
  allTimeZones: any;
  storedCities: any[];
  userSettings: any;
  isCreatingMerchant: boolean;
  allCities: any[];
  isLoadingCities: boolean;
  messages: any;
  userType: any;
  merchantStatus: boolean = null;
  merchantName: string;
  createUserForm: FormGroup;
  editUserForm: FormGroup;
  pageSizeForm: FormGroup;
  listOfMerchantRoles: IRole[];
  userRoles: AllRoles;
  isLoading: boolean;
  acquirerSettings: any;

  constructor(
    private router: Router,
    private location: Location,
    private route: ActivatedRoute,
    private acquirerService: AcquirerService,
    private alertService: AlertService,
    private storageService: StorageService,
    private fb: FormBuilder,
    private profileMgt: ProfileManagementService,
    private validationMessages: ValidationService,
    private merchants: MerchantsService,
    private formBuilder: FormBuilder,
    private userManagementService: UserManagementService,
    private paginationService: PaginationService
  ) {
    this.router.events.subscribe((val) => {
      this.currentUrl = location.path();
    });

    this.messages = this.validationMessages;
  }

  ngOnInit() {
    // this.acquirerId = this.route.snapshot.params.id
    this.route.paramMap.subscribe((params) => {
      this.acquirerId = params.get('acquirerId');
    });

    console.log('this is merchant ID', this.acquirerId);

    this.getAcquirer();

    this.getPermissions();

    this.initializeForm();

    this.storedCities = states.STATES;

    this.getCategoryCodes();
    this.getCountries();
    this.getCurrencyCodes();
    this.getMerchantTimezones();

    this.getPermissions();

    this.getCurrentUser();

    this.getUsersRoles('MERCHANT');

    this.getUserSettings();

    // this.getMerchant();

    $('#createMerchant').on('hidden.bs.modal', this.resetForm.bind(this));
  }

  // getMerchant() {
  //   this.merchants.getMerchant(this.merchantId).subscribe((response) => {
  //     console.log('Merchant Gotten', response);
  //     this.merchantName = response['merchantName'];
  //     this.createdAt = response['createdAt'];
  //     this.merchantStatus = response.isActive;
  //     // this.primaryId = response.id;
  //   });
  // }

  getUserSettings() {
    this.profileMgt.adminGetClientDetails(this.acquirerId).subscribe(
      (response) => {
        console.log('USER SETTINGSSSSSSS', response);
        this.acquirerSettings = response['data'];
      },
      (error) => {
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  resetForm() {
    this.createMerchantForm.reset();
    this.createMerchantForm.patchValue({
      categoryCode: '',
    });
  }

  getCountries() {
    this.countryCodes = countries.COUNTRY_CODES;
    this.countryCodes = this.countryCodes.map(function (country) {
      country.fullCountryLabel =
        country['ISO3166-1-Alpha-3'] +
        ' ' +
        '(' +
        country['ISO3166-1-numeric'] +
        ')';
      return country;
    });
  }

  onSelectCountryCode(countryCode) {
    const countryObj = countries.COUNTRY_CODES.find((country) => {
      return country['ISO3166-1-numeric'] == countryCode;
    });
    const countryAlpha2 = countryObj['ISO3166-1-Alpha-2'];
    this.getAllCities(countryAlpha2);
    console.log('YYYYYYYYYYYYYYYYYYYYYYYYy');
  }

  getAllCities(code) {
    this.allCities = [];
    this.isLoadingCities = true;
    console.log('HERERERER', this.storedCities);

    this.allCities = this.storedCities.filter(
      (e) => e.country_code === String(code)
    );
    this.isLoadingCities = false;
  }

  getCategoryCodes() {
    this.merchantCategoryCodes = merchantCodes.MERCHANT_CODES;
    this.merchantCategoryCodes = this.merchantCategoryCodes.map(function (cat) {
      cat.fullCatLabel =
        cat['Program Type'] + ' ' + '(' + cat['MCC CODE'] + ')';
      return cat;
    });
  }

  getCurrencyCodes() {
    this.currencyCodes = currencies.CURRENCY_CODES;
    this.currencyCodes = this.currencyCodes.map(function (curr) {
      curr.fullCurrencyLabel =
        curr['ISO4217-currency_name'] +
        ' ' +
        '(' +
        curr['ISO4217-currency_numeric_code'] +
        ')';
      return curr;
    });
  }

  getMerchantTimezones() {
    const timeZones = this.storageService.getTimezones();
    if (timeZones) {
      // dont fetch data
      console.log('RECSDEFDJFFHFHHFHFHFH');

      this.allTimeZones = timeZones;
    } else {
      this.merchants.getTimezones().subscribe((response) => {
        console.log('THese are the time zones', response);
        this.allTimeZones = response['data'];
        this.storageService.storeTimeZones(response.data);
      });
    }
  }

  backClicked() {
    this.location.back();
  }

  getPermissions() {
    this.permissions = this.storageService.getPermissions();
  }

  getCurrentUser() {
    let user = this.storageService.getCurrentUser();
    this.userType = user['user']['userType'];
  }
  getAcquirer() {
    this.acquirerService
      .getSingleAcquirer(this.acquirerId)
      .subscribe((response) => {
        console.log('acquirer Gotten', response);
        this.acquirerName = response['data']['clientName'];
        this.acquirerStatus = response['data']['status'];
        this.createdAt = response['data']['createdAt'];
      });
  }

  disableAcquirer(acquirerId) {
    this.disablingAcquirer = true;
    this.acquirerService.disableAcquirer(acquirerId).subscribe(
      (response) => {
        console.log('DISABLED RESPONSE', response);
        this.alertService.success('Acquirer Disabled Successfully');
        this.disablingAcquirer = false;
        $('#disableAcquirertModal').modal('hide');
        this.acquirerStatus = 'INACTIVE';
      },
      (error) => {
        this.alertService.error(error);
        this.disablingAcquirer = false;
      }
    );
  }

  enableAcquirer() {
    this.acquirerService.enableAcquirer(this.acquirerId).subscribe(
      (response) => {
        this.alertService.success('Acquirer Enabled Successfully');
        this.acquirerStatus = 'ACTIVE';
      },
      (error) => {
        this.alertService.error(error);
      }
    );
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      merchantId: '',
      status: '',
    });
    this.createMerchantForm = this.fb.group({
      merchantName: ['', Validators.required],
      merchantKey: [''],
      merchantId: [
        '',
        Validators.compose([
          Validators.maxLength(15),
          Validators.minLength(15),
        ]),
      ],
      currency: ['', Validators.required],
      categoryCode: ['', Validators.required],
      countryCode: ['', Validators.required],
      city: ['', Validators.required],
      merchantToken: [''],
      timezoneId: ['', Validators.required],
    });

    // INITIALIZE FORM FOR USER MODULE
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
      roleId: [''],
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

  addNewMerchant() {
    this.isCreatingMerchant = true;
    const newMerchant = {
      merchantName: this.createMerchantForm.value.merchantName,
      merchantId: this.createMerchantForm.value.merchantId,
      merchantToken: this.createMerchantForm.value.merchantToken,
      merchantCategoryCode: Number(this.createMerchantForm.value.categoryCode),
      merchantKey: this.createMerchantForm.value.merchantKey,
      currencyCode: String(this.createMerchantForm.value.currency),
      countryCode: Number(this.createMerchantForm.value.countryCode),
      city: this.createMerchantForm.value.city,
      timezoneId: +this.createMerchantForm.value.timezoneId,
    };
    this.merchants.adminAddNewMerchant(newMerchant, this.acquirerId).subscribe(
      (response) => {
        this.isCreatingMerchant = false;
        this.closeModal('cancel_button_add_merchant');
        this.alertService.success('Merchant created successfully!');
        this.reloadComponent();
      },
      (error) => {
        this.isCreatingMerchant = false;
        this.alertService.error(error);
      }
    );
  }

  closeModal(id: string) {
    document.getElementById(id).click();
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
        this.alertService.error(e);

        this.paginationService.pagerState.next(null);
      }
    );
  }
  createUser(userDetails) {
    this.isLoading = true;
    this.userManagementService
      .adminCreateUserForAcquirer(userDetails, this.acquirerId)
      .subscribe(
        (response: IUser) => {
          this.reloadComponent();
          $('#createUser').modal('hide');
          this.isLoading = false;
          console.log('User Gotten IN component', response);
          this.createUserForm.reset();
          this.alertService.success('User Created Successfully', true);
        },
        (error) => {
          this.isLoading = false;

          this.alertService.error(error);
          console.log('Error Occured in Adding user', error);
        }
      );
  }
  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }
}
