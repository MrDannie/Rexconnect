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
  public userDataObservable$: Observable<any>

  private roleData: BehaviorSubject<any>;

  constructor(private storageService: StorageService) {
    this.userData = new BehaviorSubject<any>(this.storageService.getCurrentUser())
        this.userDataObservable$ = this.userData.asObservable();

  }

    updateUserData() {
      this.userData.next(this.storageService.getCurrentUser());
    }

  //   updateRoleData() {
  //     this.roleData.next(this.storageService.getCurrentRole());
  //   }
}
