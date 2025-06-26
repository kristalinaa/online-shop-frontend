import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url: string = 'http://localhost:3000';
  

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {}




  getDashboardStats(): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/admin/stats`,
          );

    return response;
  }


  getUsersByRole(role?: string | null): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/admin/users/${role}`,
          );

    return response;
  }



  getAllProducts(): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/admin/products`,
          );

    return response;
  }

  getAllCategories(): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/admin/categories`,
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
