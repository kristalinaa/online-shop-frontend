import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  url: string = 'http://localhost:3000';
  

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {}

  createCheckout(data: any): Observable<any> {
    const response: any = this._httpClient.post(
      this.url + `/checkout`,
      data    );

    return response;
  }


  getCheckoutList(): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/checkout`,
          );

    return response;
  }

  getSingleCheckoutItems(id: number): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/checkout/single/${id}`,
          );

    return response;
  }

  getCheckoutListPerCompany(): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/checkout/per-company`,
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
