import { isNullOrUndefined } from 'util';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  storeCurrentUser(userData: any) {
    localStorage.setItem('XViFhliO', JSON.stringify(userData));
  }

  storeOutlookDetails(userData: any) {
    localStorage.setItem('_aDs', JSON.stringify(userData));
  }

  storeAdminDetails(data: any) {
    localStorage.setItem('_uDs', JSON.stringify(data));
  }

  storeClientBillerData(data: any) {
    localStorage.setItem('_cBd', JSON.stringify(data));
  }

  storeCategoryDetailsData(data: any) {
    localStorage.setItem('_cDd', JSON.stringify(data));
  }

  storeBillerDetailsData(data: any) {
    localStorage.setItem('_bDd', JSON.stringify(data));
  }

  storePayItemDetailsData(data: any) {
    localStorage.setItem('_pId', JSON.stringify(data));
  }

  storeCurrentBusiness(businessData: any) {
    console.log(businessData, 'storage');

    localStorage.setItem('XViFbushliO', JSON.stringify(businessData));
  }

  getOutlookDetails() {
    if (!isNullOrUndefined(localStorage.getItem('_aDs'))) {
      return JSON.parse(localStorage.getItem('_aDs'));
    } else {
      return false;
    }
  }

  getClientBillerData() {
    if (!isNullOrUndefined(localStorage.getItem('_cBd'))) {
      return JSON.parse(localStorage.getItem('_cBd'));
    } else {
      return false;
    }
  }

  getCategoryDetailsData() {
    if (!isNullOrUndefined(localStorage.getItem('_cDd'))) {
      return JSON.parse(localStorage.getItem('_cDd'));
    } else {
      return false;
    }
  }

  getBillerDetailsData() {
    if (!isNullOrUndefined(localStorage.getItem('_bDd'))) {
      return JSON.parse(localStorage.getItem('_bDd'));
    } else {
      return false;
    }
  }

  getPayItemDetailsData() {
    if (!isNullOrUndefined(localStorage.getItem('_pId'))) {
      return JSON.parse(localStorage.getItem('_pId'));
    } else {
      return false;
    }
  }

  getAdminDetails() {
    if (!isNullOrUndefined(localStorage.getItem('_uDs'))) {
      return JSON.parse(localStorage.getItem('_uDs'));
    } else {
      return false;
    }
  }

  getAdminToken() {
    return this.getAdminDetails().token.access_token;
  }

  getCurrentUser() {
    if (!isNullOrUndefined(localStorage.getItem('XViFhliO'))) {
      return JSON.parse(localStorage.getItem('XViFhliO'));
    } else {
      return false;
    }
  }
  getCurrentBusiness() {
    if (!isNullOrUndefined(localStorage.getItem('XViFbushliO'))) {
      return JSON.parse(localStorage.getItem('XViFbushliO'));
    } else {
      return false;
    }
  }
  getCurrentRole() {
    if (!isNullOrUndefined(localStorage.getItem('XViFhliO'))) {
      const businessId = this.getCurrentBusiness().id;

      const role = this.getCurrentUser().businessRoles.filter(
        (e) => e.business_id === businessId
      )[0].role;
      console.log('role!!!!!!!', role, businessId);

      return role;
    } else {
      return false;
    }
  }
  setActivatedUser(user) {
    localStorage.setItem('Activated User', JSON.stringify(user));
  }
  getActivatedUser() {
    if (!isNullOrUndefined(localStorage.getItem('Activated User'))) {
      return JSON.parse(localStorage.getItem('Activated User'));
    }
  }

  getAdminUserPermissions() {
    if (!isNullOrUndefined(this.getAdminDetails().role.permissions)) {
      return this.getAdminDetails().role.permissions;
    }
    // }else{
    // TODO: Log user out
    // }
  }

  removeAll() {
    localStorage.removeItem('XViFhliO');
    localStorage.removeItem('XViFbushliO');
    localStorage.removeItem('AC');
    localStorage.removeItem('_aDs');
    localStorage.removeItem('_uDs');
    localStorage.removeItem('_cBd');
    localStorage.removeItem('_cDd');
    localStorage.removeItem('_bDd');
    localStorage.removeItem('_pId');
  }
}
