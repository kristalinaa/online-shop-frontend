// src/app/core/services/notification.service.ts
import { Injectable, Inject } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface NotificationDto {
  id: number;
  message: string;
  sender?: { id: number; firstName: string; lastName: string };
  createdAt: string;
  isRead: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  url: string = 'http://localhost:3000/notification';

  private socket!: Socket;
  private _stream$ = new BehaviorSubject<NotificationDto | null>(null);
  private _unreadCount$ = new BehaviorSubject<number>(0);  

  constructor(private auth: AuthService, @Inject('WS_URL') private wsUrl: string,    private _httpClient: HttpClient,
  ) {

    const token = this.auth.access_token();
    if (token) this.init(token);
    else this.disconnect();
  }

  private init(token: string) {
    if (this.socket?.connected) return;
    this.socket = io('ws://localhost:3001', {
      transports: ['websocket'],
      auth: { token },
    });
    this.connectHandlers()
  }

  private disconnect() {
    this.socket?.disconnect();
  }

  private connectHandlers() {
    this.socket.on('notification:new', (n: NotificationDto) => {
      this._stream$.next(n);
      this._unreadCount$.next(this._unreadCount$.value + 1);   // increment
    });

    this.socket.on('notification:list', (arr: NotificationDto[]) => {
      arr.forEach((n) => this._stream$.next(n));
      this._unreadCount$.next(this._unreadCount$.value + arr.length);
    });
  }

  /** for the bell badge */
  get unreadCount$(): Observable<number> {
    return this._unreadCount$.asObservable();
  }

  /** expose the full stream if needed */
  get stream$(): Observable<NotificationDto | null> {
    return this._stream$.asObservable();
  }

  /** call this when user visits notifications page */
  markAllRead() {
    this._unreadCount$.next(0);
    this.markAsRead().subscribe({
      next: () => {
        console.log('All notifications marked as read');
      },
      error: (err) => {
        console.error('Error marking notifications as read:', err);
      }
    })
    // (optionally) POST /notifications/mark-read on backend
  }

  
  getPerUser(): Observable<any> {
    const response: any = this._httpClient.get(
      this.url + `/per-user`,
        {}  );

    return response;
  }


  markAsRead(): Observable<any> {
    const response: any = this._httpClient.post(
      this.url + `/mark-as-read`,
        {}  );

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
