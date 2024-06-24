import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject, debounceTime } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivitiesService } from '../../_services/activities.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-specialites',
  templateUrl: './specialites.component.html',
  styleUrls: ['./specialites.component.scss']
})
export class SpecialitesComponent {
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  total = 0;
  loading: boolean = false;
  list: any;
  filter = "";
  showAddSpecialites = false;
  showUpdateSpecialites = false;
  Specialites: any;
  id: any;
  private searchTerm$ = new Subject<any>();
  constructor(private activitiesService: ActivitiesService, private translate: TranslateService,
    private route: ActivatedRoute) { }
  ngOnInit() {
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm: any) => {
      this.performSearch(searchTerm)
    });
    this.route.params
      .subscribe(params => {
        this.id = params['id'];
      }
      );
  }
  lazyLoad($event: any) {
    this.page = $event.first / $event.rows + 1;
    this.per_page = $event.rows;
    this.getSpecialitesList();
  }
  getSpecialitesList() {
    let payload = {
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      nom: this.filter,
      domaineId: this.id
    };
    this.loading = true;
    this.activitiesService.getListSpecialites(payload).subscribe((res: any) => {
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
    this.getSpecialitesList();
  }
  displayAddSpecialitie() {
    this.showAddSpecialites = true;
  }
  refresh() {
    this.page = 1;
    this.getSpecialitesList();
  }
  displayUpdate(item: any) {
    this.Specialites = item;
    this.showUpdateSpecialites = true;
  }
  deleteClient(id: any) {
    this.activitiesService.deleteSpecialite(id).subscribe((res: any) => {
      this.getSpecialitesList();
      Swal.fire({
        text: "Spécialité supprimé avec succès",
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
