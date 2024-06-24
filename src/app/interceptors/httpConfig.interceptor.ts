import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../_services/auth.service";
@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((requestError) => {
        if (requestError.status.toString() === '0') {
          alert('verifier votre internet')
        }
        if (requestError.status !== 401) {
          const { error } = requestError;
          console.error({
            severity: 'error',
            summary: `HTTP Error - ${requestError.status}`,
            detail: error && error.message,
          });
        } else {
          if (requestError.status === 401) {
            this.authService.logOut();
            this.router.navigate(['/login']);
          }
        }
        return throwError(() => {
          new Error(requestError);
        });
      })
    );
  }
}
