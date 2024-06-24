import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-details-demande',
  templateUrl: './details-demande.component.html',
  styleUrls: ['./details-demande.component.scss']
})
export class DetailsDemandeComponent {
  @Input() show = false;
  @Input() item: any;
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
    }
  ]
  @Output() close: EventEmitter<any> = new EventEmitter();
  cancel() {
    this.close.emit();
  }
}
