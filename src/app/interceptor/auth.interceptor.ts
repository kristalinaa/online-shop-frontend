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

    // Clone the request object
    let newReq = req.clone();

    // Request
    //
    // If the access token didn't expire, add the Authorization header.
    // We won't add the Authorization header if the access token expired.
    // This will force the server to return a "401 Unauthorized" response
    // for the protected API routes which our response interceptor will
    // catch and delete the access token from the local storage while logging
    // the user out from the app.
    if (this._authService.loggedInUser()) {
      let headers = req.headers.set('Authorization', 'Bearer ' + this._authService.access_token());
     
      newReq = req.clone({
        headers: headers,
      });
    }

    // Response
    return next.handle(newReq).pipe(
      catchError((error) => {
        // Catch "401 Unauthorized" responses
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Sign out
          this._authService.signOutUser();
          this.toasterService.error(error.error.message, 'Error');
          // Reload the app
          //location.reload();
        } else {
          this.toasterService.error(error.error.message, 'Error');
        }

        return throwError(error);
      }),
    );
  }
}