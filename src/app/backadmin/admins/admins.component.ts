import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { Subject, debounceTime } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Store, select } from '@ngrx/store';
import { Area } from 'src/app/models/area.model';
import { Observable } from 'rxjs';
import * as areaActions from 'src/app/store/actions/area.actions';
import { selectAreas, selectAreasLoading } from 'src/app/store/reducers/area.reducer';
@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss'],
})
export class AdminsComponent implements OnInit {
  public admins: any = [];
  public adminToDelete: any;
  public showingAddAdmin: boolean = false;
  public showingUpdateAdmin: boolean = false;
  public selectedAdminToUpdate: any;
  showDelete: boolean = false;
  showUpdatePassword: boolean = false;
  first: number = 0;
  total: number = 0;
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  filter: string = '';
  loading: boolean = false;
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
  adminToUpdatePassword: any;
  filterForm = {
    statut_pro: "",
    phone: null,
    last_name: "",
    first_name: "",
    area: ""
  }
  roles: any[] = [
    {
      name: 'Administrateur',
      value: 'admin'
    },
    {
      name: 'Super Admin',
      value: 'superadmin'
    },
    {
      name: 'Opérateur',
      value: 'operateur'
    },
    {
      name: 'Dispatcheur',
      value: 'dispatcheur'
    },
    {
      name: 'Responsable marketing',
      value: 'commerciale'
    }
  ]
  order_by = 'id';
  order = 'asc';
  private searchTerm$ = new Subject<any>();
  deleted: boolean = false;
  displayRegionModal: boolean = false;
  adminToAddRegion: any;
  areas$!: Observable<Area[]>;
  loaded = false;
  list: any
  constructor(
    private userService: UserService,
    private routerService: Router,
    private translate: TranslateService,
    private store: Store
  ) {
    this.areas$ = this.store.pipe(select(selectAreas));
  }
  ngOnInit() {
    this.searchTerm$.pipe(
      debounceTime(300),
      distinctUntilChanged((x, y) => JSON.stringify(x) !== JSON.stringify(y))
    ).subscribe((searchTerm: any) => {
      this.performSearch(searchTerm)
    });
    this.areas$.subscribe((areas: any) => {
      if (!this.loaded && areas?.length == 0) {
        this.loaded = true;
        this.store.dispatch(areaActions.loadAreas());
      }
      this.list = areas.data;
    });
  }
  getAdminList() {
    let payload = {
      statut_pro: this.filterForm.statut_pro ? this.filterForm.statut_pro : "",
      phone: this.filterForm.phone ? this.filterForm.phone : '',
      last_name: this.filterForm.last_name,
      first_name: this.filterForm.first_name,
      area: this.filterForm.area,
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      filter: this.filter,
      'roles[]': ['admin', 'superadmin', 'operateur', 'dispatcheur', 'commerciale'],
      orderBy: this.order_by,
      orderDirection: this.order
    };
    this.loading = true;
    this.deleted = false;
    this.userService.getUsersList(payload).subscribe(
      (res: any) => {
        this.admins = res.body.data;
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
      this.getDeletedAdminList()
    }
    else {
      this.getAdminList();
    }
  }
  resetFilter() {
    this.filterForm.first_name = "";
    this.filterForm.last_name = "";
    this.filterForm.phone = null;
    this.filterForm.statut_pro = "";
    this.filterForm.area = "";
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
          this.getDeletedAdminList();
          Swal.fire({
            text: "Admin restauré avec succès",
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
      && !this.filterForm.statut_pro && !this.filterForm.area
  }
  getDeletedAdminList() {
    let payload = {
      phone: this.filterForm.phone ? this.filterForm.phone : '',
      last_name: this.filterForm.last_name,
      first_name: this.filterForm.first_name,
      area: this.filterForm.area,
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      filter: this.filter,
      'roles[]': ['admin', 'superadmin', 'operateur', 'dispatcheur', 'commerciale'],
      orderBy: this.order_by,
      orderDirection: this.order
    };
    this.loading = true;
    this.deleted = true;
    this.userService.getDeletedUsersList(payload).subscribe(
      (res: any) => {
        this.admins = res.body.data;
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
  displayAddAdmin() {
    this.showingAddAdmin = !this.showingAddAdmin;
  }
  displayUpdateAdmin(admin: any = false) {
    if (admin !== false) {
      this.selectedAdminToUpdate = admin;
    }
    this.showingUpdateAdmin = !this.showingUpdateAdmin;
  }
  adminDetails(id: any) {
    this.routerService.navigate(['/admins/details/' + id]);
  }
  deleteAdmin() {
    if (this.deleted) {
      this.userService.deleteUserPermanantly(this.adminToDelete.id).subscribe((res: any) => {
        this.getDeletedAdminList();
        Swal.fire({
          text: "Admin supprimé avec succès",
          icon: 'success',
          customClass: {
            confirmButton: 'btn-primary',
          }
        })
      });
    }
    else {
      this.userService.deleteUser(this.adminToDelete.id).subscribe((res: any) => {
        this.getAdminList();
        Swal.fire({
          text: "Admin supprimé avec succès",
          icon: 'success',
          customClass: {
            confirmButton: 'btn-primary',
          }
        })
      });
    }
  }
  toggleDeleteAdmin(elm: any = false) {
    this.adminToDelete = elm;
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
        this.deleteAdmin()
      }
    })
  }
  toggleUpdatePassword(admin: any) {
    this.showUpdatePassword = !this.showUpdatePassword;
    this.adminToUpdatePassword = admin;
  }
  updateAdminStatus(id: any, event: any) {
    const formData = {
      status: event.value,
    };
    this.userService.changeStatus(id, formData).subscribe(
      (res: any) => {
        this.getAdminList();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  refreshList() {
    if (this.deleted) {
      this.getDeletedAdminList()
    }
    else {
      this.getAdminList()
    }
  }
  displayAddRegion(admin: any) {
    this.adminToAddRegion = admin;
    this.displayRegionModal = true
  }
}
