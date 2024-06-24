import { ChangeDetectorRef, Component } from '@angular/core';
import { AppService } from "../_services/app.service";
import { Subscription } from "rxjs";
@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  private subUrlChanged: Subscription | undefined;
  sidebarFilters: boolean = false;
  currentFilter: string | undefined;
  constructor(
    private appService: AppService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.subUrlChanged = this.appService.urlChanged.subscribe((e: any) => {
      let $this = this;
      setTimeout(() => {
        if (e.url.indexOf('dashboard') !== -1) {
          $this.currentFilter = 'dashboard';
          $this.sidebarFilters = false;
        }
        else {
          $this.sidebarFilters = false;
        }
        this.cdRef.detectChanges();
      }, 1340);
    }, (error: any) => { console.error(error); });
  }
}
