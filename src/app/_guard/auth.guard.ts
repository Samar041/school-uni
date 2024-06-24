import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../_services/localstorage.service';
const helper = new JwtHelperService();
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private localstorageService: LocalStorageService
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let token = this.localstorageService.getAdminToken();
    try {
      if (token === null ) {
        this.localstorageService.clear();
        this.router.navigate(['login'])
        return false
      }
      return true;
    } catch (err) {
      return false
    }
  }
}
