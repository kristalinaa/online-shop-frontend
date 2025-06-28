import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url: string = 'http://localhost:3000/category';


  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) { }

  createCategory(data: any): Observable<any> {
    const response: any = this._httpClient.post(
      this.url,
      data);

    return response;
  }


  
  updateCategory(data: any): Observable<any> {
    const response: any = this._httpClient.patch(
      this.url + `/update/${data.id}`,
      data);

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
