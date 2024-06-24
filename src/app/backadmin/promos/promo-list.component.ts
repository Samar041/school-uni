import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import Swal from 'sweetalert2';
import {Location} from '@angular/common';
import {LazyLoadEvent} from 'primeng/api';
import {Subject, Subscription} from "rxjs";
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/users.service';
import { PromosService } from '../_services/promos.services';
PromosService
@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.scss']
})
export class PromoListComponent implements OnInit {
  showingAddPromo: boolean = false;
  showingUpdatePub: boolean = false;
  first: number = 0;
  total: number = 0;
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  filter: string = '';
  loading: boolean = false;
  order_by = 'id';
  order = 'asc';
  promoList:any=[];
  promoId:any;
  showingUpdatePromo: boolean = false;
  filterForm = {
    statut: "",
    date_fin: "",
    date_debut: "",
    status: "",
  }
  statusList: any = [
    { id: 1, name: this.translate.instant('STATUS.FENCED'),value:'FENCED', color: "#fe5050"  },
    { id: 2, name: this.translate.instant('STATUS.SCHEDULED'),value:'SCHEDULED', color: "#ffb74c" },
    { id: 3, name: this.translate.instant('STATUS.IN_PROGRESS') ,value:'IN_PROGRESS', color: "#17c2c2"}
  ];
  
  private searchTerm$ = new Subject<any>();
  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,
    public promosService: PromosService
  ) { }
  ngOnInit() {
    this.AfficheList()
  }
  
  displayAddPromo() {
    this.showingAddPromo = !this.showingAddPromo;
  }

  closeAddPromo($event:any) {
    this.showingAddPromo = $event;
    this.refreshList();
  } 
  displayUpdatePub() {
    this.showingUpdatePub = !this.showingUpdatePub;
    this.refreshList();
  }

 
  lazyLoad($event: any) {
    this.page = $event.first / $event.rows + 1;
    this.order_by = $event.sortField ? $event.sortField : 'id';
    this.order = $event.sortOrder == 1 ? 'asc' : 'desc';
    this.per_page = $event.rows;
    this.refreshList()
  }
  refreshList() {
    this.AfficheList()
  }
  
  AfficheList() {
    let payload = {
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      filter: this.filter,
      orderBy: this.order_by,
      orderDirection: this.order,
      date_fin:this.filterForm.date_fin,
      date_debut:this.filterForm.date_debut,
      statut:this.filterForm.statut,

    };
    this.loading = true;
    this.promosService.getList(payload).subscribe(
      (res: any) => {
        this.promoList = res.body.data;
        this.total = res.body?.paginator?.total;
        this.last_page = res.body?.paginator?.last_page;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }
  displayAddAnnounce() {
    this.showingAddPromo = !this.showingAddPromo;

  } 
  
  displayEditAnnounce(id:any) {
    this.promoId = id;
    this.showingUpdatePromo = !this.showingUpdatePromo;

  }

  
  closeEditPromo($event:any) {
    this.showingUpdatePromo = $event;
    this.AfficheList()

  }
  deletePromo(id:any) {
    
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
        this.promosService.deletePromos(id).subscribe((res: any) => {
          Swal.fire({
            text: "Promotion supprimé avec succès",
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

resetFilter() {
  this.filterForm.date_fin = "";
  this.filterForm.date_debut = "";
  this.filterForm.statut = "";
  this.filterChange();
}
filterChange() {
  this.searchTerm$.next(this.filterForm);
  this.AfficheList()
}

get emptyFilter() {
  return !this.filterForm.date_debut && !this.filterForm.date_fin 
    && !this.filterForm.statut
}

formatDate(date: any) {
    const dateFin = new Date(date);
    const year = dateFin.getFullYear();
    const month = ('0' + (dateFin.getMonth() + 1)).slice(-2);
    const day = ('0' + dateFin.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
}
}
