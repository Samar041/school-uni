import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../_services/users.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, debounceTime } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { DemandeService } from '../_services/demandes.services';
import { Store, select } from '@ngrx/store';
import { Area } from 'src/app/models/area.model';
import * as areaActions from 'src/app/store/actions/area.actions';
import { selectAreas, selectAreasLoading } from 'src/app/store/reducers/area.reducer';

@Component({
  selector: 'app-demande-list',
  templateUrl: './demande-list.component.html',
  styleUrls: ['./demande-list.component.scss'],
})
export class DemandeListComponent implements OnInit {
  public demandes: any = [];
  public demandeToDelete: any;
  public showingAddDemande: boolean = false;
  public showingUpdateDemande: boolean = false;
  public selectedDemandeToUpdate: any;
  showDelete: boolean = false;
  showUpdatePassword: boolean = false;
  first: number = 0;
  total: number = 0;
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  filter: string = '';
  loading: boolean = false;
  allStatus = [
    {
      value: 'PENDING',
      name: 'En attente',
      color: "#ffb74c"
    },
    {
      value: 'ACCEPTED',
      name: 'Accepté par l\'admin',
      color: "#2C76BE"
    },
    {
      value: 'VALIDATION',
      name: 'Validé par le prestataire',
      color: "#75C2F6"
    },
    {
      value: 'INPROGRESS',
      name: 'En cours',
      color: "#17c2c2"
    },
    {
      value: 'WAITING',
      name: 'Transmis à l\'admin',
      color: "#FD7716"
    },
    {
      value: 'ONROAD',
      name: 'Analyse de problème',
      color: "#F2C525"
    },
    {
      value: 'FINISHED',
      name: 'finie',
      color: "#fe5050"
    },
    {
      name: this.translate.instant('STATUS.DELETED'),
      value: 'DELETED',
      color: "#db1345"
    },
  ]
  DemandeToUpdatePassword: any;
  filterForm = {
    statut: "",
    phone: null,
    prestataire: "",
    client: "",
    date_debut: "",
    date_fin: "",
    area: ""
  }
  order_by = '';
  order = 'asc';
  private searchTerm$ = new Subject<any>();
  deleted: boolean = false;
  demandeId: any;
  Clients: any = [];
  Providers: any = [];
  areas$!: Observable<Area[]>;
  loaded = false;
  list: any
  constructor(
    private demandeService: DemandeService,
    private routerService: Router,
    private translate: TranslateService,
    private userService: UserService,
    private store: Store
  ) {
    this.areas$ = this.store.pipe(select(selectAreas));
  }
  ngOnInit() {
    this.getProvider();
    this.getClientList();
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
  getDemandeList() {
    let payload = {
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      filter: this.filter,
      prestataire: this.filterForm.prestataire,
      date_debut: this.filterForm.date_debut,
      date_fin: this.filterForm.date_fin,
      client: this.filterForm.client,
      statut: this.filterForm.statut === null ? "" : this.filterForm.statut,
      area: this.filterForm.area,
    };
    this.loading = true;
    this.deleted = false;
    this.demandeService.getList(payload).subscribe(
      (res: any) => {
        this.demandes = res.body.data;
        this.total = res.body?.paginator.total;
        this.last_page = res.body?.paginator.last_page;
        this.loading = false;
        this.deleted = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  filterChange($event: any) {
    this.searchTerm$.next(this.filterForm);
  }
  resetFilter() {
    this.filterForm.prestataire = "";
    this.filterForm.client = "";
    this.filterForm.statut = "";
    this.filterForm.date_debut = "";
    this.filterForm.date_fin = "";
    this.filterForm.area = "";
    this.filterChange(null)
  }
  get emptyFilter() {
    return !this.filterForm.prestataire && !this.filterForm.client && !this.filterForm.phone
      && !this.filterForm.statut && !this.filterForm.date_debut && !this.filterForm.date_fin
      && !this.filterForm.area
  }
  lazyLoad($event: any) {
    this.page = $event.first / $event.rows + 1;
    this.order_by = $event.sortField ? $event.sortField : 'id';
    this.order = $event.sortOrder == 1 ? 'asc' : 'desc';
    this.per_page = $event.rows;
    this.refreshList()
  }
  displayAddDemande() {
    this.showingAddDemande = true;
  }
  closeAddDemande(event: any) {
    this.showingAddDemande = event;
  }
  displayUpdateDemande(id: any) {
    this.demandeId = id;
    this.showingUpdateDemande = true;
  }
  closeUpdateDemande(event: any) {
    this.showingUpdateDemande = event;
  }
  DemandeDetails(id: any) {
    this.routerService.navigate(['/demandes/details/' + id]);
  }
  deleteDemande(id: any) {
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
        this.demandeService.deleteDemande(id).subscribe((res: any) => {
          this.getDemandeList();
          Swal.fire({
            text: "Demande supprimé avec succès",
            icon: 'success',
            customClass: {
              confirmButton: 'btn-primary',
            }
          })
        });
        this.getDemandeList();
      }
    })
  }
  trashedDeleteDemande(id: any) {
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
        this.demandeService.softDeleteDemande(id).subscribe((res: any) => {
          this.getDemandeList();
          Swal.fire({
            text: "Demande supprimé avec succès",
            icon: 'success',
            customClass: {
              confirmButton: 'btn-primary',
            }
          })
        });
        this.getDemandeList();
      }
    })
  }
  refreshList() {
    this.getDemandeList()
  }
  updateDemandestatus(id: any, event: any) {
    const formData = {
      statut: event.value,
    };
    this.demandeService.updateDemandeStatus(id, formData).subscribe(
      (res: any) => {
        this.getDemandeList();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  getClientList() {
    let payload = {
      'roles[]': ['client'],
    };
    this.userService.getUsersList(payload).subscribe(
      (res: any) => {
        this.Clients = res.body.data;
      }
    );
  }
  getProvider() {
    this.userService.getProviderList().subscribe(
      (res: any) => {
        this.Providers = res.body;
      }
    );
  }
  getDeletedList() {
    let payload = {
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      filter: this.filter,
      prestataire: this.filterForm.prestataire,
      client: this.filterForm.client,
      date_debut: this.filterForm.date_debut,
      date_fin: this.filterForm.date_fin,
      statut: this.filterForm.statut === null ? "" : this.filterForm.statut,

    };
    this.loading = true;
    this.deleted = false;
    this.demandeService.getDeletedDemandeList(payload).subscribe(
      (res: any) => {
        console.log(res);
        this.demandes = res.body;
        this.total = res.body?.length;
        this.loading = false;
        this.deleted = true;
      },
      () => {
        this.loading = false;
      }
    );
  }
  performSearch(terms: any) {
    this.page = 1;
    if (this.filterForm.statut == 'DELETED') {
      this.getDeletedList()
    }
    else {
      this.getDemandeList();
    }
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
        this.demandeService.restaurer(id).subscribe((res: any) => {
          this.getDeletedList();
          Swal.fire({
            text: "Demande restauré avec succès",
            icon: 'success',
            customClass: {
              confirmButton: 'btn-primary',
            }
          })
        })
      }
    })
  }
  closeUpdateWithNoRefresh() {
    this.showingUpdateDemande = !this.showingUpdateDemande;
  }
  closeAddWithNoRefresh() {
    this.showingAddDemande = !this.showingAddDemande;
  }
  getTrashedList() {

  }
  refresh() {
    if (this.filterForm.statut == 'DELETED') {
      this.getDeletedList()
    }
    else {
      this.getDemandeList()
    }
  }
}
