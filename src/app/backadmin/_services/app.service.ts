import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  public urlChanged = new Subject();
  _langueSlected = new BehaviorSubject("NOS SERVICES")
  constructor(
    private location: Location
  ) {
    location.onUrlChange((url, state) => {
      this.urlChanged.next({ url, state });
    });
  }
  setLangueSelected(langue: any) {
    this._langueSlected.next(langue);
  }
  getLangueSelectedObservable(): Observable<any> {
    return this._langueSlected.asObservable();
  }
}
