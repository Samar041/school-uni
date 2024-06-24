import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SuiviDemandeService } from '../../_services/suivi-demande.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-assign-provider-modal',
  templateUrl: './assign-provider-modal.component.html',
  styleUrls: ['./assign-provider-modal.component.scss'],
  providers: [MessageService]
})
export class AssignProviderModalComponent {
  @Input() show = false;
  @Input() item: any;
  loading = false;
  allStatus = [
    {
      value: 'PENDING',
      name: 'En attente'
    },
    {
      value: 'ACCEPTED',
      name: 'Accepté'
    },
    {
      value: 'VALIDATION',
      name: 'validé'
    },
    {
      value: 'INPROGRESS',
      name: 'En cours'
    },
    {
      value: 'FINISHED',
      name: 'fini'
    },
    {
      value: 'WAITING',
      name: 'En attente'
    }
  ]
  listPrestataires: any = []
  @Output() close: EventEmitter<any> = new EventEmitter();
  constructor(private suiviDemandeService: SuiviDemandeService, private messageService: MessageService) { }
  cancel() {
    this.close.emit();
  }
  ngOnInit(): void {
    this.getPrestatairesInSameArea()
  }
  getPrestatairesInSameArea() {
    this.loading = true;
    this.suiviDemandeService.getPrestatairesInSameArea(this.item).subscribe((res: any) => {
      this.listPrestataires = res.body.prestataires[0] ? res.body.prestataires : [];
      this.loading = false;
    })
  }
  submit(prestataire: any) {
    prestataire.loading = true;
    this.suiviDemandeService.assignDemande(this.item, {
      prestataire: prestataire.id
    }).subscribe(() => {
      prestataire.loading = false;
      this.messageService.add({ severity: 'success', summary: '', detail: 'Prestataire affecté avec succès' });
      setTimeout(() => {
        this.close.emit();
      }, 500)
    })
  }
}
