import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, debounceTime } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { ActivitiesService } from '../_services/activities.service';
@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent {
  public providers: any = [];
  public ProviderToDelete: any;
  public showingAddProvider: boolean = false;
  public showingUpdateProvider: boolean = false;
  public selectedProviderToUpdate: any;
  showDelete: boolean = false;
  showUpdatePassword: boolean = false;
  first: number = 0;
  total: number = 0;
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  filter: string = '';
  loading: boolean = false;
  order_by = 'id';
  order = 'asc';
  allStatus: any = [
    { id: 1, name: this.translate.instant('STATUS.ACTIVE'), value: 'ACTIVE', color: "#17c2c2" },
    { id: 2, name: this.translate.instant('STATUS.PENDING'), value: 'PENDING', color: "#ffb74c" },
    { id: 3, name: this.translate.instant('STATUS.DISABLED'), value: 'INACTIVE', color: "#3d5b82" },
    { id: 4, name: this.translate.instant('STATUS.BLOCKED'), value: 'BLOCKED', color: "#fe5050" },
    { id: 4, name: this.translate.instant('STATUS.DELETED'), value: 'DELETED', color: "#db1345" },
  ];
  status: any = [
    { id: 1, name: this.translate.instant('STATUS.ACTIVE'), value: 'ACTIVE', color: "#17c2c2" },
    { id: 2, name: this.translate.instant('STATUS.PENDING'), value: 'PENDING', color: "#ffb74c" },
    { id: 3, name: this.translate.instant('STATUS.DISABLED'), value: 'INACTIVE', color: "#3d5b82" },
    { id: 4, name: this.translate.instant('STATUS.BLOCKED'), value: 'BLOCKED', color: "#fe5050" },
  ];
  ProviderToUpdatePassword: any;
  filterForm = {
    statut_pro: "",
    phone: null,
    last_name: "",
    first_name: "",
    societe: ""
  }
  private searchTerm$ = new Subject<any>();
  specialites: any;
  deleted: boolean = false;
  constructor(
    private userService: UserService,
    private routerService: Router,
    private translate: TranslateService,
    private activitiesService: ActivitiesService
  ) { }
  ngOnInit() {
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged((x, y) => JSON.stringify(x) !== JSON.stringify(y))
    ).subscribe((searchTerm: any) => {
      this.performSearch(searchTerm)
    });
    this.getAllDomainesWithSpecialities()
  }
  getAllDomainesWithSpecialities() {
    this.activitiesService.getListSpecialitesByDomaines().subscribe((res: any) => {
      this.specialites = Object.keys(res.body).map(([key, value]) => {
        const item = res.body[key];
        return {
          label: item.nom,
          data: { id: item.id, name: item.nom },
          expanded: true,
          children: item.specialities.map((i: any) => {
            return {
              label: i.nom,
              data: { id: i.id, name: i.nom }
            }
          })
        }
      })
    })
  }
  getProviderList() {
    let payload = {
      statut_pro: this.filterForm.statut_pro ? this.filterForm.statut_pro : "",
      phone: this.filterForm.phone ? this.filterForm.phone : '',
      last_name: this.filterForm.last_name,
      first_name: this.filterForm.first_name,
      societe: this.filterForm.societe,
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      filter: this.filter,
      'roles[]': ['prestataire'],
      orderBy: this.order_by,
      orderDirection: this.order
    };
    this.loading = true;
    this.deleted = false;
    this.userService.getUsersList(payload).subscribe(
      (res: any) => {
        this.providers = res.body.data;
        this.total = res.body?.paginator.total;
        this.last_page = res.body?.paginator.last_page;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  filterChange() {
    this.searchTerm$.next(this.filterForm);
  }
  performSearch(terms: any) {
    this.page = 1;
    if (this.filterForm.statut_pro == 'DELETED') {
      this.getDeletedProviderList()
    }
    else {
      this.getProviderList();
    }
  }
  resetFilter() {
    this.filterForm.first_name = "";
    this.filterForm.last_name = "";
    this.filterForm.phone = null;
    this.filterForm.statut_pro = "";
    this.filterForm.societe = ""
    this.filterChange();
  }
  restaurer(id: any) {
    Swal.fire({
      text: 'Êtes-vous sûr(e) de vouloir restauser',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: "Confirmer",
      cancelButtonText: "Annuler",
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn-primary',
        cancelButton: 'btn-cancel'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.restaurer(id).subscribe((res: any) => {
          this.getDeletedProviderList();
          Swal.fire({
            text: "Prestataire restauré avec succès",
            icon: 'success',
            customClass: {
              confirmButton: 'btn-primary',
            }
          })
        })
      }
    })
  }
  get emptyFilter() {
    return !this.filterForm.first_name && !this.filterForm.last_name && !this.filterForm.phone
      && !this.filterForm.statut_pro && !this.filterForm.societe
  }
  getDeletedProviderList() {
    let payload = {
      phone: this.filterForm.phone ? this.filterForm.phone : '',
      last_name: this.filterForm.last_name,
      first_name: this.filterForm.first_name,
      societe: this.filterForm.societe,
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      filter: this.filter,
      'roles[]': ['prestataire'],
      orderBy: this.order_by,
      orderDirection: this.order
    };
    this.loading = true;
    this.deleted = true;
    this.userService.getDeletedUsersList(payload).subscribe(
      (res: any) => {
        this.providers = res.body.data;
        this.total = res.body?.paginator.total;
        this.last_page = res.body?.paginator.last_page;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  lazyLoad($event: any) {
    this.page = $event.first / $event.rows + 1;
    this.order_by = $event.sortField ? $event.sortField : 'id';
    this.order = $event.sortOrder == 1 ? 'asc' : 'desc';
    this.per_page = $event.rows;
    this.refreshList()
  }
  displayAddProvider() {
    this.showingAddProvider = !this.showingAddProvider;
  }
  displayUpdateProvider(Provider: any = false) {
    if (Provider !== false) {
      this.selectedProviderToUpdate = Provider;
    }
    this.showingUpdateProvider = !this.showingUpdateProvider;
  }
  ProviderDetails(id: any) {
    const queryParams = {
      deleted: this.deleted,
    };
    this.routerService.navigate(['/companies/details/' + id], { queryParams });
  }
  deleteProvider() {
    if (this.deleted) {
      this.userService.deleteUserPermanantly(this.ProviderToDelete.id).subscribe((res: any) => {
        this.getDeletedProviderList();
        Swal.fire({
          text: "Prestatire supprimé avec succès",
          icon: 'success',
          customClass: {
            confirmButton: 'btn-primary',
          }
        })
      });
    }
    else {
      this.userService.deleteUser(this.ProviderToDelete.id).subscribe((res: any) => {
        this.getProviderList();
        Swal.fire({
          text: "Prestatire supprimé avec succès",
          icon: 'success',
          customClass: {
            confirmButton: 'btn-primary',
          }
        })
      });
    }
  }
  toggleDeleteProvider(elm: any = false) {
    this.ProviderToDelete = elm;
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
        this.deleteProvider()
      }
    })
  }
  toggleUpdatePassword(Provider: any) {
    this.showUpdatePassword = !this.showUpdatePassword;
    this.ProviderToUpdatePassword = Provider;
  }
  updateProviderStatus(id: any, event: any) {
    const formData = {
      status: event.value,
    };
    this.userService.changeStatus(id, formData).subscribe(
      (res: any) => {
        this.getProviderList();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  refreshList() {
    if (this.deleted) {
      this.getDeletedProviderList()
    }
    else {
      this.getProviderList()
    }
  }
  startDay(provider: any) {
    if (!provider.disableClick) {
      provider.disableClick = true;
      this.userService.startDay(provider.id).subscribe((res: any) => {
        provider.current_state = 1;
        provider.disableClick = false;
      },
        (err: any) => {
          provider.disableClick = false;
        })
    }
  }
  endDay(provider: any) {
    if (!provider.disableClick) {
      provider.disableClick = true;
      this.userService.endDay(provider.id).subscribe((res: any) => {
        provider.current_state = 0;
        provider.disableClick = false;
      },
        (err: any) => {
          provider.disableClick = false;
        })
    }
  }
}
