import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'any',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _authService: AuthService, private toasterService: ToastrService) {}

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq = req.clone();

    if (this._authService.loggedInUser()) {
      let headers = req.headers.set('Authorization', 'Bearer ' + this._authService.access_token());
     
      newReq = req.clone({
        headers: headers,
      });
    }

    return next.handle(newReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out
          this._authService.signOutUser();
          this.toasterService.error(error.error.message, 'Error');
          // Reload the app
        } else {
          this.toasterService.error(error.error.message, 'Error');
        }

        return throwError(error);
      }),
    );
  }
}