import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { AnnoncesService } from '../_services/annonces.services';
import { UserService } from '../_services/users.service';

@Component({
  selector: 'app-annonces-list',
  templateUrl: './annonces-list.component.html',
  styleUrls: ['./annonces-list.component.scss'],
})
export class AnnoncesListComponent implements OnInit {
  showingAddAnnounce: boolean = false;
  showingUpdateAnnounce: boolean = false;
  first: number = 0;
  total: number = 0;
  per_page: number = 10;
  page: number = 1;
  last_page: number = 1;
  filter: string = '';
  loading: boolean = false;
  allStatus: any = [
    { id: 1, name: 'PROGRAM', color: '#17c2c2', label: 'Programmée' },
    { id: 2, name: 'ENCOURS', color: '#ffb74c', label: 'En cours' },
    { id: 3, name: 'CLOTURE', color: '#fe5050', label: 'Cloturée' },
  ];
  order_by = 'id';
  order = 'asc';
  listeAnnonce: any = [];
  annonceId: any;
  filterForm = {
    statut: '',
    end_date: '',
    start_date: '',
    status: '',
    title: '',
  };
  private searchTerm$ = new Subject<any>();
  constructor(
    private formBuilder: UntypedFormBuilder,
    public translate: TranslateService,
    public annonceService: AnnoncesService,
    public userService: UserService
  ) {}
  ngOnInit() {
    this.AfficheList();
  }

  displayAddAnnounce() {
    this.showingAddAnnounce = !this.showingAddAnnounce;
  }

  displayUpdatePub() {
    this.showingUpdateAnnounce = !this.showingUpdateAnnounce;
  }

  lazyLoad($event: any) {
    this.page = $event.first / $event.rows + 1;
    this.order_by = $event.sortField ? $event.sortField : 'id';
    this.order = $event.sortOrder == 1 ? 'asc' : 'desc';
    this.per_page = $event.rows;
    this.refreshList();
  }
  refreshList() {
    this.AfficheList();
  }

  AfficheList() {
    let payload = {
      paginated: 1,
      page: this.page,
      page_size: this.per_page,
      filter: this.filter,
      orderBy: this.order_by,
      orderDirection: this.order,
      end_date: this.filterForm.end_date,
      start_date: this.filterForm.start_date,
      statut: this.filterForm.statut,
      title: this.filterForm.title,
    };
    this.loading = true;
    this.annonceService.getList(payload).subscribe(
      (res: any) => {
        this.listeAnnonce = res.body.data;
        this.total = res.body?.paginator?.total;
        this.last_page = res.body?.paginator?.last_page;
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  displayEditAnnounce(id: any) {
    this.annonceId = id;
    this.showingUpdateAnnounce = !this.showingUpdateAnnounce;
  }
  closeAddAnnounce($event: any) {
    this.showingAddAnnounce = $event;
    this.AfficheList();
  }
  closeEditAnnounce($event: any) {
    this.showingUpdateAnnounce = $event;
    this.AfficheList();
  }

  deleteAnnounce(id: any) {
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
        this.annonceService.deleteAnnounce(id).subscribe((res: any) => {
          Swal.fire({
            text: 'Annonce supprimé avec succès',
            icon: 'success',
            customClass: {
              confirmButton: 'btn-primary',
            },
          });
          this.AfficheList();
        });
      }
    });
  }
  resetFilter() {
    this.filterForm.end_date = '';
    this.filterForm.start_date = '';
    this.filterForm.statut = '';
    this.filterForm.title = '';
    this.filterChange();
    this.AfficheList();
  }
  filterChange() {
    this.searchTerm$.next(this.filterForm);
    this.AfficheList();
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
        //   this.AfficheList();
        //   Swal.fire({
        //     text: "publicitées réstaurée avec succès",
        //     icon: 'success',
        //     customClass: {
        //       confirmButton: 'btn-primary',
        //     }
        //   })
        // })
      }
    });
  }
  get emptyFilter() {
    return (
      !this.filterForm.start_date &&
      !this.filterForm.title &&
      !this.filterForm.end_date &&
      !this.filterForm.statut
    );
  }
}
