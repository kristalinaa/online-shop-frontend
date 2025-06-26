import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class BankAccountService {

  url: string = 'http://localhost:3000';
  

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {}

  createBankAccount(data: any): Observable<any> {
    const response: any = this._httpClient.post(
      this.url + `/bank-account`,
      data    );

    return response;
  }

  updateBankAccount(data: any,cardId: number): Observable<any> {
    const response: any = this._httpClient.patch(
      this.url + `/bank-account/${cardId}`,
      data    );

    return response;
  }


  getBankAccounts(): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/bank-account`,
          );

    return response;
  }


  getSingleBankAccount(id: number): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/bank-account/single/${id}`,
          );

    return response;
  }


  getTimelinePerBankAccount(id: number): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/bank-account/single/timeline/${id}`,
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
