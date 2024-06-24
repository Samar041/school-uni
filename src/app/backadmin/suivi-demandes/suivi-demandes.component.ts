import { Component } from '@angular/core';
import { SuiviDemandeService } from '../_services/suivi-demande.service';
import Swal from 'sweetalert2';
import { LaravelEchoService } from 'src/app/_services/laravel-echo.service';

@Component({
  selector: 'app-suivi-demandes',
  templateUrl: './suivi-demandes.component.html',
  styleUrls: ['./suivi-demandes.component.scss']
})
export class SuiviDemandesComponent {
  cols: any = [
    {
      id: 1,
      name: 'En attente',
      showDropZones: false,
      canDrop: false,
      canDrag: true,
      demandes: []
    },
    {
      id: 2,
      name: 'Prestataire validé',
      showDropZones: false,
      canDrop: false,
      canDrag: false,
      demandes: []
    },
    {
      id: 3,
      name: 'Affecter un prestataire',
      showDropZones: false,
      canDrop: false,
      canDrag: true,
      demandes: []
    },
    {
      id: 4,
      name: 'Prestataire affecté',
      showDropZones: false,
      canDrag: false,
      demandes: []
    },
    {
      id: 5,
      name: 'Analyse de problème',
      showDropZones: false,
      canDrop: false,
      canDrag: false,
      demandes: []
    },
    {
      id: 6,
      name: 'Demande lancé',
      showDropZones: false,
      canDrop: false,
      canDrag: false,
      demandes: []
    }
  ]
  dragged: any = null;
  index = null;
  col: any = null;
  showDropZones = false;
  data: any;
  loading = false;
  showDetails = false;
  demandeToDisplay: any;
  showAssignModal = false;
  demandeToAssign: any;
  constructor(private suiviDemandeService: SuiviDemandeService, private laravelEchoService: LaravelEchoService) {
    this.laravelEchoService.newDemandeDispatcherEvent().subscribe((res: any) => {
      console.log("new demande");
    })
  }
  ngOnInit(): void {
    this.fetchAllDemandes(true);
  }
  dragStart(payload: any) {
    this.dragged = { ...payload.item };
    this.index = payload.index;
    this.col = payload.col;
    this.getDropZone(payload.col)
    this.cols.map((c: any) => {
      if (c.id != payload.col.id && c.canDrop) {
        c.showDropZones = true;
      }
    })
    this.showDropZones = true;
  }
  dragEnd(payload: any) {
    this.showDropZones = false;
    this.cols.map((c: any) => {
      c.showDropZones = false;
      c.canDrop = false;
    })
  }
  drop(col: any) {
    col.demandes.push(this.dragged);
    this.col.demandes.splice(this.index, 1);
    this.cols.map((c: any) => {
      c.showDropZones = false;
      c.canDrop = false;
    });
    this.showDropZones = false;
    this.updateStatus(col)
  }
  fetchAllDemandes(loading: boolean) {
    this.loading = loading;
    this.suiviDemandeService.getAll().subscribe((res: any) => {
      this.data = res.body;
      if (this.data.PENDING) {
        this.cols[0].demandes = this.data.PENDING;
      }
      else {
        this.cols[0].demandes = [];
      }
      if (this.data.ACCEPTED) {
        this.cols[1].demandes = this.data.ACCEPTED;
      }
      else {
        this.cols[1].demandes = [];
      }
      if (this.data.VALIDATION) {
        this.cols[3].demandes = this.data.VALIDATION;
      }
      else {
        this.cols[3].demandes = [];
      }
      if (this.data.ONROAD) {
        this.cols[4].demandes = this.data.ONROAD;
      }
      else {
        this.cols[4].demandes = [];
      }
      if (this.data.INPROGRESS) {
        this.cols[5].demandes = this.data.INPROGRESS;
      }
      else {
        this.cols[5].demandes = [];
      }
      if (this.data.WAITING) {
        this.cols[2].demandes = this.data.WAITING;
      }
      else {
        this.cols[2].demandes = [];
      }
      this.loading = false;
    })
  }
  displayDetailsModal(item: any) {
    this.showDetails = true;
    this.demandeToDisplay = item
  }
  displayAssignModal(item: any) {
    this.showAssignModal = true;
    this.demandeToAssign = item
    console.log(item);
  }
  updateStatus(col: any) {
    switch (col.id) {
      case 2:
        this.activateDemande(this.dragged?.id)
        break;
      case 4:
        this.affecterPrestatire(this.dragged?.id)
        break;
    }
  }
  activateDemande(id: any) {
    this.suiviDemandeService.acceptDemande(
      {
        "statut": "ACCEPTED"
      },
      id
    ).subscribe((res: any) => {
      this.dragged = null;
      this.fetchAllDemandes(false);
    },
      (error: any) => {
        this.dragged = null;
        this.fetchAllDemandes(false);
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: false
        });
        Toast.fire({
          icon: "error",
          title: "Une erreur se produit"
        });
      })
  }
  getDropZone(col: any) {
    switch (col.id) {
      case 1:
        this.cols[1].canDrop = true
        break;
      case 3:
        this.cols[3].canDrop = true
        break;
    }
  }
  affecterPrestatire(payload: any) {
    this.displayAssignModal(payload)
  }
  closeAssignPrestataire() {
    this.showAssignModal = false;
    this.fetchAllDemandes(false);
  }
}
