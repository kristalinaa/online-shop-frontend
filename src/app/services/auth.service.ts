import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url: string = 'http://localhost:3000';

  localStorageKey: string = 'user-shop';
  constructor(private http: HttpClient) {}
  user: any;

  registerUser(user: any) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    return this.http.post(this.url + '/auth/register', user, {
      headers: headers,
    });
  }

  loginUser(user: any) {
    const headers = new HttpHeaders().append(
      'Content-Type',
      'application/json'
    );

    return this.http.post(this.url + '/auth/login', user, { headers: headers });
  }

  saveUserToLocalStorag(userObject: any) {
    this.user = userObject;
    window.localStorage.setItem(
      this.localStorageKey,
      JSON.stringify(userObject)
    );
  }

  signOutUser() {
    window.localStorage.removeItem(this.localStorageKey);
    window.location.reload();
  }

  loggedInUser() {
    let userInLocalStorage = window.localStorage.getItem(this.localStorageKey);
    if (userInLocalStorage) {
      return JSON.parse(userInLocalStorage);
    }
    return null;
  }

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: any): Observable<any> {
    return this.http.post(this.url + '/api/auth/forgot-password', email);
  }

  changePassword(object: any): Observable<any> {
    return this.http.post(this.url + '/api/auth/change-password', object);
  }
  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(passwordForm: any): Observable<any> {
    return this.http.post(this.url + '/api/auth/reset-password', passwordForm);
  }

  isRole(role: string) {
    const user = this.loggedInUser();

    return user?.roles.includes(role);
  }
}
