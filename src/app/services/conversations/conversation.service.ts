import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  url: string = 'http://localhost:3000/conversations';
  chatRoomUrl: string = 'http://localhost:3000/chat-message';

  
    constructor(
      private _httpClient: HttpClient,
      private _authService: AuthService
    ) { }
  
    getOrCreate(data: any): Observable<any> {
      const response: any = this._httpClient.get(
        this.url + `/pair/${data.id}`,
        );
  
      return response;
    }
  

    getAllRoomsPerUser(): Observable<any> {
      const response: any = this._httpClient.get(
        this.url + `/mine`,
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
