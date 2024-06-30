import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subject, debounceTime } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { UserService } from '../_services/users.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  public Clients: any = [];
  public ClientToDelete: any;
  public showingAddClient: boolean = false;
  public showingUpdateClient: boolean = false;
  public selectedClientToUpdate: any;
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
    {
      id: 1,
      name: this.translate.instant('STATUS.ACTIVE'),
      value: 'ACTIVE',
      color: '#17c2c2',
    },
    {
      id: 2,
      name: this.translate.instant('STATUS.PENDING'),
      value: 'PENDING',
      color: '#ffb74c',
    },
    {
      id: 3,
      name: this.translate.instant('STATUS.DISABLED'),
      value: 'INACTIVE',
      color: '#3d5b82',
    },
    {
      id: 4,
      name: this.translate.instant('STATUS.BLOCKED'),
      value: 'BLOCKED',
      color: '#fe5050',
    },
    {
      id: 4,
      name: this.translate.instant('STATUS.DELETED'),
      value: 'DELETED',
      color: '#db1345',
    },
  ];
  status: any = [
    {
      id: 1,
      name: this.translate.instant('STATUS.ACTIVE'),
      value: 'ACTIVE',
      color: '#17c2c2',
    },
    {
      id: 2,
      name: this.translate.instant('STATUS.PENDING'),
      value: 'PENDING',
      color: '#ffb74c',
    },
    {
      id: 3,
      name: this.translate.instant('STATUS.DISABLED'),
      value: 'INACTIVE',
      color: '#3d5b82',
    },
    {
      id: 4,
      name: this.translate.instant('STATUS.BLOCKED'),
      value: 'BLOCKED',
      color: '#fe5050',
    },
  ];
  ClientToUpdatePassword: any;
  filterForm = {
    statut_pro: '',
    phone: null,
    last_name: '',
    first_name: '',
    // area: '',
  };
  order_by = 'id';
  order = 'asc';
  private searchTerm$ = new Subject<any>();
  deleted: boolean = false;
  // areas$!: Observable<Area[]>;
  loaded = false;
  list: any;
  constructor(
    private userService: UserService,
    private routerService: Router,
    private translate: TranslateService
  ) {
    // this.areas$ = this.store.pipe(select(selectAreas));
  }
  ngOnInit() {
    this.searchTerm$
      .pipe(
        debounceTime(300),
        distinctUntilChanged((x, y) => JSON.stringify(x) !== JSON.stringify(y))
      )
      .subscribe((searchTerm: any) => {
        this.performSearch(searchTerm);
      });
    // this.areas$.subscribe((areas: any) => {
    //   if (!this.loaded && areas?.length == 0) {
    //     this.loaded = true;
    //     this.store.dispatch(areaActions.loadAreas());
    //   }
    //   this.list = areas.data;
    // });
  }
  getClientList() {
    let payload = {
      statut_pro: this.filterForm.statut_pro ? this.filterForm.statut_pro : '',
      phone: this.filterForm.phone ? this.filterForm.phone : '',
      last_name: this.filterForm.last_name,
      first_name: this.filterForm.first_name,
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      filter: this.filter,
      'roles[]': ['client'],
      orderBy: this.order_by,
      orderDirection: this.order,
      // area: this.filterForm.area,
    };
    this.loading = true;
    this.deleted = false;
    // this.userService.getUsersList(payload).subscribe(
    //   (res: any) => {
    //     this.Clients = res.body.data;
    //     this.total = res.body?.paginator.total;
    //     this.last_page = res.body?.paginator.last_page;
    //     this.loading = false;
    //   },
    //   () => {
    //     this.loading = false;
    //   }
    // );
  }
  filterChange() {
    this.searchTerm$.next(this.filterForm);
  }
  performSearch(terms: any) {
    this.page = 1;
    if (this.filterForm.statut_pro == 'DELETED') {
      this.getDeletedClientList();
    } else {
      this.getClientList();
    }
  }
  resetFilter() {
    this.filterForm.first_name = '';
    this.filterForm.last_name = '';
    this.filterForm.phone = null;
    this.filterForm.statut_pro = '';
    // this.filterForm.area = '';
    this.filterChange();
  }
  restaurer(id: any) {
    Swal.fire({
      text: 'Êtes-vous sûr(e) de vouloir restauser',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn-primary',
        cancelButton: 'btn-cancel',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // this.userService.restaurer(id).subscribe((res: any) => {
        //   this.getDeletedClientList();
        //   Swal.fire({
        //     text: 'Client restauré avec succès',
        //     icon: 'success',
        //     customClass: {
        //       confirmButton: 'btn-primary',
        //     },
        //   });
        // });
      }
    });
  }
  get emptyFilter() {
    return (
      !this.filterForm.first_name &&
      !this.filterForm.last_name &&
      !this.filterForm.phone &&
      !this.filterForm.statut_pro
      //  &&
      // !this.filterForm.area
    );
  }
  getDeletedClientList() {
    let payload = {
      phone: this.filterForm.phone ? this.filterForm.phone : '',
      last_name: this.filterForm.last_name,
      first_name: this.filterForm.first_name,
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      filter: this.filter,
      'roles[]': ['client'],
      orderBy: this.order_by,
      orderDirection: this.order,
      // area: this.filterForm.area,
    };
    this.loading = true;
    this.deleted = true;
    // this.userService.getDeletedUsersList(payload).subscribe(
    //   (res: any) => {
    //     this.Clients = res.body.data;
    //     this.total = res.body?.paginator.total;
    //     this.last_page = res.body?.paginator.last_page;
    //     this.loading = false;
    //   },
    //   () => {
    //     this.loading = false;
    //   }
    // );
  }
  lazyLoad($event: any) {
    this.page = $event.first / $event.rows + 1;
    this.order_by = $event.sortField ? $event.sortField : 'id';
    this.order = $event.sortOrder == 1 ? 'asc' : 'desc';
    this.per_page = $event.rows;
    this.refreshList();
  }
  displayAddClient() {
    this.showingAddClient = !this.showingAddClient;
  }
  displayUpdateClient(Client: any = false) {
    if (Client !== false) {
      this.selectedClientToUpdate = Client;
    }
    this.showingUpdateClient = !this.showingUpdateClient;
  }
  ClientDetails(id: any) {
    const queryParams = {
      deleted: this.deleted,
    };
    this.routerService.navigate(['/users/details/' + id], { queryParams });
  }
  deleteClient() {
    if (this.deleted) {
      // this.userService
      //   .deleteUserPermanantly(this.ClientToDelete.id)
      //   .subscribe((res: any) => {
      //     this.getDeletedClientList();
      //     Swal.fire({
      //       text: 'Client supprimé avec succès',
      //       icon: 'success',
      //       customClass: {
      //         confirmButton: 'btn-primary',
      //       },
      //     });
      //   });
    } else {
      // this.userService
      //   .deleteUser(this.ClientToDelete.id)
      //   .subscribe((res: any) => {
      //     this.getClientList();
      //     Swal.fire({
      //       text: 'Client supprimé avec succès',
      //       icon: 'success',
      //       customClass: {
      //         confirmButton: 'btn-primary',
      //       },
      //     });
      //   });
    }
  }
  toggleDeleteClient(elm: any = false) {
    this.ClientToDelete = elm;
    Swal.fire({
      text: this.translate.instant('COMMON.CONFIRM_DELETE'),
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Supprimer',
      cancelButtonText: 'Annuler',
      reverseButtons: true,
      customClass: {
        confirmButton: 'btn-primary',
        cancelButton: 'btn-cancel',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteClient();
      }
    });
  }
  toggleUpdatePassword(Client: any) {
    this.showUpdatePassword = !this.showUpdatePassword;
    this.ClientToUpdatePassword = Client;
  }
  updateClientStatus(id: any, event: any) {
    const formData = {
      status: event.value,
    };
    // this.userService.changeStatus(id, formData).subscribe(
    //   (res: any) => {
    //     this.getClientList();
    //   },
    //   (error: any) => {
    //     console.error(error);
    //   }
    // );
  }
  refreshList() {
    if (this.deleted) {
      this.getDeletedClientList();
    } else {
      this.getClientList();
    }
  }
}
