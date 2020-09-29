import { DateService } from './../../../../shared/services/date.service';
import { StorageService } from './../../../../../core/helpers/storage.service';
import { Config } from './../../../../../core/Config';
import { HttpClient } from '@angular/common/http';
import { Subject, BehaviorSubject, ReplaySubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

const BASE_URL = environment.BASE_URL;
const EXTERNAL_BASE_URL = environment.EXTERNAL_BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  //  businessUserData = new BehaviorSubject(this.storageService.getCurrentUser());
  private businessUserData: BehaviorSubject<any>;

  public businessUserData$: Observable<any>;
  private userData: BehaviorSubject<any>;

  public userData$: Observable<any>;
  private roleData: BehaviorSubject<any>;

  public roleData$: Observable<any>;
  private userRole: BehaviorSubject<any>;

  public userRole$: Observable<any>;

  private userEdit: BehaviorSubject<any>;

  public userEdit$: Observable<any>;
  selectedBusiness: any;
  selectedUser: any;
  selectedRole: any;
  selectedEnvironment: BehaviorSubject<any>;
  public selectedEnvironment$: Observable<any>;

  constructor(
    private httpClient: HttpClient,
    private config: Config,
    private dateService: DateService,
    private storageService: StorageService
  ) {
    this.selectedBusiness = this.storageService.getCurrentBusiness();
    this.selectedUser = this.storageService.getCurrentUser();
    this.selectedRole = this.storageService.getCurrentRole();
    this.businessUserData = new BehaviorSubject<any>(
      this.storageService.getCurrentBusiness()
    );
    this.businessUserData$ = this.businessUserData.asObservable();
    this.userData = new BehaviorSubject<any>(
      this.storageService.getCurrentUser()
    );
    this.userData$ = this.userData.asObservable();
    this.roleData = new BehaviorSubject<any>(
      this.storageService.getCurrentRole()
    );
    this.roleData$ = this.roleData.asObservable();
    this.selectedEnvironment = new BehaviorSubject<any>('staging');
    this.selectedEnvironment$ = this.selectedEnvironment.asObservable();
    this.userEdit = new BehaviorSubject<any>({});
    this.userEdit$ = this.userEdit.asObservable();
  }

  nextBusinessUserData(userData) {
    this.businessUserData.next(userData);
  }
  nextUserData(userData) {
    this.userData.next(userData);
  }
  nextRoleData(roleData) {
    this.roleData.next(roleData);
  }

  clearSubscriptions() {
    this.userData.next({});
    this.businessUserData.next({});
    this.roleData.next({});
  }

  updateBusinessData() {
    this.businessUserData.next(this.storageService.getCurrentBusiness());
  }
  updateUserData() {
    this.userData.next(this.storageService.getCurrentUser());
  }
  updateRoleData() {
    this.roleData.next(this.storageService.getCurrentRole());
  }
  updateEnviroment(env) {
    this.selectedEnvironment.next(env);
  }
  updateUserDataToEdit(editUser) {
    this.userEdit.next(editUser);
  }

  public get currentBusinessValue() {
    return this.businessUserData.value;
  }
  public get currentUserValue() {
    return this.userData.value;
  }
  public get currentRoleValue() {
    return this.roleData.value;
  }
  public get currentEnvironment() {
    return this.selectedEnvironment.value;
  }

  updateComponents() {
    console.log('updated');
    this.businessUserData.next(this.storageService.getCurrentBusiness());
    this.userData.next(this.storageService.getCurrentUser());
    this.roleData.next(this.storageService.getCurrentRole());
  }
  getAuditLogs(offset: string, limit: string, searchParams) {
    let params = new HttpParams();
    console.log(searchParams);

    if (offset) {
      params = params.append('offset', offset);
    }

    if (limit) {
      params = params.append('limit', limit);
    }

    if (searchParams.startDate) {
      params = params.append(
        'start',
        this.dateService.formatDate(searchParams.startDate)
      );
    }

    if (searchParams.endDate) {
      params = params.append(
        'end',
        new Date(
          new Date(Date.parse(searchParams.endDate)).setHours(24, 59, 59)
        )
          .toISOString()
          .split('.')[0]
          .toString()
      );
    }
    this.selectedUser = this.storageService.getCurrentUser();
    console.log(this.selectedUser);

    // if (this.selectedBusiness) {
    //   params = params.append("identity", this.selectedUser.user["id"]);
    // }
    this.selectedBusiness = this.storageService.getCurrentBusiness();

    return this.httpClient.get(
      `${EXTERNAL_BASE_URL}${this.config.auditLogs}${this.selectedBusiness['id']}`,
      {
        params,
      }
    );
  }
}
