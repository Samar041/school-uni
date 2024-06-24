import { Injectable } from '@angular/core';
import { AuthService } from "../_services/auth.service";
import { Router } from '@angular/router';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from './localstorage.service';
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
    private localstorageService: LocalStorageService
  ) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // add authorization header with jwt token if available
    const currentUser = this.localstorageService.getAdminToken();
    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser}`
        }
      });
    }
    return next.handle(request).pipe(tap((res: any) => {
      if (res.body?.original?.message == "Unauthorized. No user is connected.") {
        this.authService.logOut();
        this.router.navigate(['login']);
      }
    },
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status !== 401 && err.status !== 403) {
            return;
          }
          else if (currentUser) {
            this.authService.logOut();
            this.router.navigate(['login']);
          }
        }
      }));
  }
}
