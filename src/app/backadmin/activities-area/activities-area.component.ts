import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, debounceTime } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivitiesService } from '../_services/activities.service';



@Component({
  selector: 'app-activities-area',
  templateUrl: './activities-area.component.html',
  styleUrls: ['./activities-area.component.scss']
})
export class ActivitiesAreaComponent {
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  total = 0;
  loading: boolean = false;
  list: any;
  filter = "";
  showAddActivity = false;
  showUpdateActivity = false;
  activity: any;
  private searchTerm$ = new Subject<any>();
  constructor(private activitiesService: ActivitiesService, private translate: TranslateService) { }
  ngOnInit() {
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm: any) => {
      this.performSearch(searchTerm)
    });
  }
  lazyLoad($event: any) {
    this.page = $event.first / $event.rows + 1;
    this.per_page = $event.rows;
    this.getActivitiesList();
  }
  getActivitiesList() {
    let payload = {
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      nom: this.filter,
    };
    this.loading = true;
    this.activitiesService.getList(payload).subscribe((res: any) => {
      this.list = res.body.data;
      this.total = res.body?.paginator.total;
      this.last_page = res.body?.paginator.last_page;
      this.loading = false;
    },
      () => {
        this.loading = false;
      });
  }
  filterChange() {
    this.searchTerm$.next(this.filter);
  }
  performSearch(terms: any) {
    this.page = 1;
    this.getActivitiesList();
  }
  displayAddActivity() {
    this.showAddActivity = true;
  }
  refresh() {
    this.page = 1;
    this.getActivitiesList();
  }
  displayUpdateActivity(item: any) {
    this.activity = item;
    this.showUpdateActivity = true;
  }
  deleteClient(id: any) {
    this.activitiesService.deleteActivity(id).subscribe((res: any) => {
      this.getActivitiesList();
      Swal.fire({
        text: "Domaine d\'activités supprimé avec succès",
        icon: 'success',
        customClass: {
          confirmButton: 'btn-primary',
        }
      })
    });
  }
  toggleDeleteClient(elm: any = false) {
    Swal.fire({
      text: this.translate.instant('COMMON.CONFIRM_DELETE'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Supprimer",
      cancelButtonText: "Annuler",
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn-primary',
        cancelButton: 'btn-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteClient(elm)
      }
    })
  }
}
