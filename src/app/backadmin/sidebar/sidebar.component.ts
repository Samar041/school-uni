import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router, ActivatedRoute, } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  providers: [],
})
export class SidebarComponent implements OnInit {
  status = false;
  overlayStatus = false;
  currentFilter: any;
  state = {
    'users': false,
    'ventes': false,
    'encheres': false,
    'pub': false,
    'demande': false
  } as any;
  constructor(
    public router: Router,
    public translate: TranslateService,
    public _route: ActivatedRoute,
  ) {
  }
  ngOnInit(): void {
    this.setCurrentFilter()
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  clickEvent(): void {
    this.status = !this.status;
  }
  overlayStatusFct(): void {
    this.overlayStatus = false;
    this.closeFilters();
  }
  openFilter(name: string) {
    this.overlayStatus = !this.overlayStatus;

    Object.keys(this.state).forEach((key) => {
      if (name == key) {
        this.state[key] = !this.state[key]

      }
      else {
        this.state[key] = false
      }
    });
  }
  closeFilters() {
    Object.keys(this.state).forEach((key) => {
      this.state[key] = false
    });
  }
  isFilterActive() {
    let res: string | undefined;
    Object.keys(this.state).forEach((key) => {
      if (this.state[key]) {
        res = key;
      }
    });
    return res;
  }
  setCurrentFilter() {
    if (this._route.firstChild?.snapshot.routeConfig?.data) {
      this.currentFilter = this._route.firstChild?.snapshot.routeConfig?.data['activeFilter']
    }
    else {
      this.currentFilter = null
    }
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        if (this._route.firstChild?.snapshot.routeConfig?.data) {
          this.currentFilter = this._route.firstChild?.snapshot.routeConfig?.data['activeFilter']
        }
        else {
          this.currentFilter = null
        }
      }
    });
  }
}
