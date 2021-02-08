import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../helpers/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ManageUserRoleGuardGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    const permissions = this.storageService.getPermissions();

    if (permissions.includes('CAN_MANAGE_ROLE')) {
      console.log('IT REACHED THE AUTH GUARD');
      return true;
    } else {
      this.router.navigate(['sign-in']);
      return false;
    }
  }
}
