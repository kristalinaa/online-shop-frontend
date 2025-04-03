import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

export interface Product {
  id: number;
  productName: string;
  description: string;
  quantity: number;
  price: number;
  currency: string;
  // Include any other properties (e.g., attachments) as needed
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url: string = 'http://localhost:3000';
  

  constructor(
    private _httpClient: HttpClient,
    private _authService: AuthService
  ) {}

  saveProduct(formData: FormData): Observable<any> {
    const response: any = this._httpClient.post(
      this.url + `/product`,
      formData    );

    return response;
  }

  getProducts(): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/product`
        );

    return response;
  }


  getProductDetails(id: number): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/product/${id}`
        );

    return response;
  }

  getCategories(): Observable<any[]> {
    const response: any = this._httpClient.get(
      this.url + `/category`
        );

    return response;
  }

  getChildren(id: number): Observable<any[]> {
    const response: any = this._httpClient.get(
      this.url + `/category/children/${id}`
    );

    return response;
  }


  getAncestors(id: number): Observable<any[]> {
    const response: any = this._httpClient.get(
      this.url + `/category/ancestors/${id}`
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
