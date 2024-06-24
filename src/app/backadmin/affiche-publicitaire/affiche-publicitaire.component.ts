import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { LazyLoadEvent } from 'primeng/api';
import { Observable, Subject, Subscription, debounceTime, distinctUntilChanged } from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/users.service';
import { AffichePublicitaireService } from '../_services/affiche-publicitaire.services';
import { Store, select } from '@ngrx/store';
import { Area } from 'src/app/models/area.model';
import * as areaActions from 'src/app/store/actions/area.actions';
import { selectAreas, selectAreasLoading } from 'src/app/store/reducers/area.reducer';

@Component({
  selector: 'app-affiche-publicitaire',
  templateUrl: './affiche-publicitaire.component.html',
  styleUrls: ['./affiche-publicitaire.component.scss']
})
export class AffichePublicitaireComponent implements OnInit {
  showingAddPub: boolean = false;
  showingUpdatePub: boolean = false;
  first: number = 0;
  total: number = 0;
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  filter: string = '';
  loading: boolean = false;
  allStatus: any = [{ id: 1, name: 'PROGRAM', color: "#17c2c2", label: "Programmée" }, { id: 2, name: 'ENCOURS', color: "#ffb74c", label: "En cours" }, { id: 3, name: 'CLOTURE', color: "#fe5050", label: "Cloturée" }];
  order_by = 'id';
  order = 'asc';
  affichePublicitaire: any = [];
  filterForm = {
    statut: "",
    date_debut: "",
    date_fin: "",
    first_name: "",
    area: ""
  }
  pubId: any;
  private searchTerm$ = new Subject<any>();
  areas$!: Observable<Area[]>;
  loaded = false;
  list: any
  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,
    public affichePublicitaireService: AffichePublicitaireService,
    public userService: UserService,
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
  displayAddPub() {
    this.showingAddPub = !this.showingAddPub;
  }
  displayEditPub(id: any) {
    this.pubId = id;
    this.showingUpdatePub = !this.showingUpdatePub;
  }
  closeEditPub() {
    this.showingUpdatePub = !this.showingUpdatePub;
  }
  AfficheList() {
    let payload = {
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      filter: this.filter,
      orderBy: this.order_by,
      orderDirection: this.order,
      date_fin: this.filterForm.date_fin,
      date_debut: this.filterForm.date_debut,
      statut: this.filterForm.statut,
      first_name: this.filterForm.first_name,
      area: this.filterForm.area,
    };
    this.loading = true;
    this.affichePublicitaireService.getList(payload).subscribe(
      (res: any) => {
        this.affichePublicitaire = res.body.data;
        this.total = res.body?.paginator?.total;
        this.last_page = res.body?.paginator?.last_page;
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
    this.AfficheList()
  }
  resetFilter() {
    this.filterForm.date_debut = "";
    this.filterForm.date_fin = "";
    this.filterForm.statut = "";
    this.filterForm.first_name = "";
    this.filterForm.area = "";
    this.filterChange();
  }
  filterChange() {
    this.searchTerm$.next(this.filterForm);
  }
  performSearch(terms: any) {
    this.page = 1;
    this.AfficheList();
  }
  deleteAdmin(id: any) {
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
        this.affichePublicitaireService.deletePubPermanantly(id).subscribe((res: any) => {
          Swal.fire({
            text: "Affiche publicitaire supprimée avec succès",
            icon: 'success',
            customClass: {
              confirmButton: 'btn-primary',
            }
          });
          this.AfficheList();

        });
      }
    })
  }
  get emptyFilter() {
    return !this.filterForm.date_fin && !this.filterForm.first_name && !this.filterForm.date_debut
      && !this.filterForm.statut && !this.filterForm.area
  }
}
