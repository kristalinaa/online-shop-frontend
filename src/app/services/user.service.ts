import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:3000/user';
    
  
    constructor(
      private _httpClient: HttpClient,
      private _authService: AuthService
    ) {}
  
    updateUserGenericData(data: any): Observable<any> {
      const response: any = this._httpClient.patch(
        this.url + `/update-active/${data.id}`,
        data    );
  
      return response;
    }
  
  
     deleteUser(data: any): Observable<any> {
      const response: any = this._httpClient.delete(
        this.url + `/${data.id}`,
        data    );
  
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
