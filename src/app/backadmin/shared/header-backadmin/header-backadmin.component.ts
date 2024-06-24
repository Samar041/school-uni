import { AuthService } from './../../../_services/auth.service';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { LocalStorageService } from 'src/app/_services/localstorage.service';

@Component({
  selector: 'app-header-backadmin',
  templateUrl: './header-backadmin.component.html',
  styleUrls: ['./header-backadmin.component.scss']
})
export class HeaderBackadminComponent {
  statusToggleDropdownList: Boolean = false;
  admin: any;
  constructor(private authService: AuthService,private router: Router, private localstorageService: LocalStorageService) {
    this.admin = this.authService.admin;
  }
  logout() {
    this.localstorageService.clear();
    this.router.navigate(['login']);
  }
  toggleDropdownList() {
    this.statusToggleDropdownList = !this.statusToggleDropdownList;
  }
}
