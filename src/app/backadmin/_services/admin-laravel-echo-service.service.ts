import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import * as _Echo from "laravel-echo";
import {observable, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminLaravelEchoServiceService {
  Echo : any;
  AdminChannel : any;
  private newCommandSubject : Subject<any> = new Subject<any>();
  private newCommandNotAssignedSubject : Subject<any> = new Subject<any>();
  private newCommandPreAssignedSubject : Subject<any> = new Subject<any>();
  private newMessageSubject : Subject<any> = new Subject<any>();
  private changePositionSubject : Subject<any> = new Subject<any>();
  private deliveryOffLineSubject : Subject<any> = new Subject<any>();
  private deliveryOnLineSubject : Subject<any> = new Subject<any>();
  private SupplierOnLineSubject : Subject<any> = new Subject<any>();
  private SupplierOffLineSubject : Subject<any> = new Subject<any>();
  private FeedbackCommandSubject: Subject<any> = new Subject<any>();
  constructor() {
    let options_socket = {
      broadcaster: 'pusher',
      authEndpoint:  environment.laravelEcho.authEndpoint,
      key: environment.laravelEcho.key,
      forceTLS: environment.laravelEcho.forceTLS,
      auth: {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('adminToken')
        }
      }
    }
    if(environment?.laravelEcho?.locale){
      // @ts-ignore
      options_socket['wsHost'] = environment.laravelEcho.wsHost;
      // @ts-ignore
      options_socket['wsPort'] = environment.laravelEcho.wsPort;
      // @ts-ignore
      options_socket['wssPort'] = environment.laravelEcho.wssPort;
    }else {
      // @ts-ignore
      options_socket['cluster'] =environment.laravelEcho.cluster
    }
    this.Echo = new _Echo.default(options_socket);
    this.AdminChannel.listen('.action',(data: any) => {
      this.computeEvents(data);
    });
  }

  private computeEvents(data: any){
    switch (data.type_event){
      case 'manager-reminder':
        this.newCommandSubject.next(data);
        break;
    }
  }

   public newMessageEvent(): Observable<any> {
    return this.newMessageSubject.asObservable();
  }

   
}
