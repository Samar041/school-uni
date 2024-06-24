import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';


import { Observable, Subject } from "rxjs";
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class LaravelEchoService {
  private echo!: Echo;
  public notifications: any = [];
  private dispatcherNewDemandeSubject: Subject<any> = new Subject<any>();
  admin: any;
  constructor(private authService: AuthService) {
    this.admin = this.authService.admin;
    const options: any = {
      ...environment.pusher,
      broadcaster: 'pusher',
    }

    this.echo = new Echo({
      ...options,
      client: new Pusher(options.key, options)
    });
    this.echo.channel('private-.admin.' + this.admin.id).listen('.action', (event: any) => {
      this.computeEvents(event)
    });
  }
  ngOnInit(): void {

  }
  computeEvents(data: any) {
    switch (data.type_event) {
      case 'notification-admin':
        this.dispatcherNewDemandeSubject.next(data);
        break;
    }
  }
  public newDemandeDispatcherEvent(): Observable<any> {
    return this.dispatcherNewDemandeSubject.asObservable();
  }
}
