import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class BagService {

  url: string = 'http://localhost:3000';
  

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {}

  saveToBagProduct(data: any): Observable<any> {
    const response: any = this._httpClient.post(
      this.url + `/bag`,
      data    );

    return response;
  }


  productOnBagPerUser(): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/bag/product-per-user`
          );

    return response;
  }

  removeBagItem(id: number): Observable<any> {
    const response: any = this._httpClient.delete(
      this.url + `/bag/${id}`
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
