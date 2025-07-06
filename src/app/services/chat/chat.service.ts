import { Injectable, Inject } from "@angular/core";
import { BehaviorSubject, Observable, fromEvent, Subject } from "rxjs";
import { Socket, io } from "socket.io-client";
import { AuthService } from "../auth.service";
import { ChatMessage } from "../../interface/interface";

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket!: Socket;
  private messages$ = new BehaviorSubject<ChatMessage | null>(null);
  private history$ = new Subject<ChatMessage[]>();

  constructor(private auth: AuthService, @Inject('WS_URL') private url: string) {
    const token = this.auth.access_token();
    if (token) {
      this.init(token);
    }

    // Handle incoming real-time messages
    this.socket?.on('chat:new', (m: any) => {
      this.messages$.next(m);
      console.log('New message received:', m);
    });

    // Handle chat history response
    this.socket?.on('chat:history', (msgs: ChatMessage[]) => {
      this.history$.next(msgs);
    });
  }

  private join(convId: string) {
    this.socket.emit('chat:join', { convId });
  }
  private init(token: string) {
    if (this.socket?.connected) return;
    this.socket = io(this.url, {
      transports: ['websocket'],
      auth: { token },
    });
  }

  /** Send new message */
  send(recipientId: string, text: string) {
    this.socket.emit('chat:send', { recipientId, text });
    
  }

  /** Request chat history for a given conversation ID (example: "15-16") */
  requestHistory(convId: string) {
    this.join(convId);

    this.socket.emit('chat:history', { withUser: convId });
  }

  /** Alternatively, use ACK to get a single response as a Promise */
  async requestHistoryOnce(convId: string): Promise<ChatMessage[]> {
    return new Promise((resolve, reject) => {
      this.socket.timeout(5000).emit('chat:history', { withUser: convId }, (err: any, res: ChatMessage[]) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  /** Real-time messages stream */
  onMessage(): Observable<ChatMessage | null> {
    return this.messages$.asObservable();
  }

  /** Chat history stream */
  onHistory(): Observable<ChatMessage[]> {
    return this.history$.asObservable();
  }
}
