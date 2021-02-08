import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  storeCurrentUser(userData: any) {
    console.log(userData);

    localStorage.setItem('UserDait_er', JSON.stringify(userData));
  }

  storeClientDetails(clientDetails) {
    localStorage.setItem('Clients_Dtls', JSON.stringify(clientDetails));
  }

  getCurrentUser() {
    if (!isNullOrUndefined(localStorage.getItem('UserDait_er'))) {
      return JSON.parse(localStorage.getItem('UserDait_er'));
    }
  }
  getCurrentRole() {}

  removeAll() {
    localStorage.removeItem('UserDait_er');
    localStorage.removeItem('Clients_Dtls');
  }

  getPermissions() {
    if (
      !isNullOrUndefined(
        JSON.parse(localStorage.getItem('UserDait_er')).user.permissions
      )
    ) {
      return JSON.parse(localStorage.getItem('UserDait_er')).user.permissions;
    }
  }
}
