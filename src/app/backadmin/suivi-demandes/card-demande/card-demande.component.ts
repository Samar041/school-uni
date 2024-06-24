import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-card-demande',
  templateUrl: './card-demande.component.html',
  styleUrls: ['./card-demande.component.scss']
})
export class CardDemandeComponent {
  @Input() item: any;
  @Input() index = 0;
  @Input() col: any = 0;
  @Input() canDrag = false;
  @Output() showDetails: EventEmitter<any> = new EventEmitter();
  @Output() dragStart: EventEmitter<any> = new EventEmitter();
  @Output() dragEnd: EventEmitter<any> = new EventEmitter();
  @Output() validate: EventEmitter<any> = new EventEmitter();
  @Output() affecter: EventEmitter<any> = new EventEmitter();
  displayDetailsModal() {
    this.showDetails.emit(this.item);
  }
  dragStarthandler() {
    this.dragStart.emit({ item: this.item, index: this.index, col: this.col })
  }
  dragEndhandler() {
    this.dragEnd.emit(this.col)
  }
  validateDemande() {
    this.validate.emit(this.item.id)
  }
  affecterDemande() {
    this.affecter.emit(this.item.id)
  }
  getSeverity(date: any) {
    const date1 = moment(date);
    const date2 = moment();
    const differenceInMinutes = date2.diff(date1, 'minutes');
    if (differenceInMinutes > 20 && differenceInMinutes <= 30) {
      return 'warning'
    }
    if (differenceInMinutes <= 20) {
      return 'success'
    }
    return 'danger'
  }
}
