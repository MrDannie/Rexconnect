import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from 'src/app/core/helpers/storage.service';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private userData: BehaviorSubject<any>;
  public userData$: Observable<any>;

  constructor(private storageService: StorageService) {
    this.userData = new BehaviorSubject<any>(this.storageService.getCurrentUser());
    this.userData$ = this.userData.asObservable();

  }

    public updateUserData() {
      this.userData.next(this.storageService.getCurrentUser());
    }

    public nextUserData(userData) {
      this.userData.next(userData);
    }

    public get currentUserValue() {
      return this.userData.value;
    }

    public updateComponents() {
      console.log("updated");
      this.userData.next(this.storageService.getCurrentUser());
    }
   
  //   updateRoleData() {
  //     this.roleData.next(this.storageService.getCurrentRole());
  //   }
}
