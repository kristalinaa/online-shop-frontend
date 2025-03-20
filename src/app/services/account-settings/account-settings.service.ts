import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountSettingsService {
  url: string = 'http://localhost:3000';

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {}

  getProfileInfo(): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/api/user/account-settings/profile-info`,
      this._getHttpOptions(null)
    );

    return response;
  }

  getLoginSecurityInfo(): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/api/user/account-settings/login-security`,
      this._getHttpOptions(null)
    );

    return response;
  }
  updateProfileInfo(updatedProfileData: any): Observable<any> {
    const response: any = this._httpClient.put(
      this.url + `/api/user/account-settings/profile-info`,
      updatedProfileData,
      this._getHttpOptions(null)
    );

    return response;
  }

  _getHttpOptions(params?: HttpParams | null): any {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // Authorization:
        //     localStorage.getItem('token') != null
        //         ? 'bearer ' + localStorage.getItem('token')
        //         : 'test',
      }),
      params: params,
    };
    return httpOptions;
  }
}
