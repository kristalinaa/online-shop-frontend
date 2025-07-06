import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription, filter } from 'rxjs';
import { ChatMessage } from '../../interface/interface';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConversationService } from '../../services/conversations/conversation.service';

@Component({
  selector: 'app-chat',
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit, OnDestroy {
  peerId!: string;               
  messages: any[] = [];
  contacts: any[] = []; // Lista e kontakteve, mund të jetë e ngarkuar nga një shërbim tjetër
  text = '';
  menuOpen: boolean = false; // Për menunë e kontakteve
  activeContact: any = null; // Përdoret për të mbajtur kontaktin aktual të hapur
  draft: string = ''; // Për të ruajtur draftin e mesazhit
  private sub = new Subscription();

  constructor(private chat: ChatService, private authService: AuthService, private cvs: ConversationService) { }

  ngOnInit() {
  this.cvs.getAllRoomsPerUser().subscribe({
    next: (response) => {
      this.contacts = response;
    
    },
    error: (error) => {
      console.error('Error fetching contacts:', error);
    }
  });

  this.sub.add(
    this.chat.onHistory().subscribe(list => {
      this.messages = list;
    }),
  );

  this.sub.add(
    this.chat.onMessage().pipe(filter(Boolean)).subscribe(m => {
      const myId = this.authService.loggedInUser()?.id;
      if (
        m!.sender.id === this.activeContact?.id ||
        (m!.recipient.id === this.activeContact?.id && m!.sender.id === myId)
      ) {
        this.messages.push(m!);
      }
    }),
  );
}

  send() {
    if (!this.draft.trim()) return;
    this.chat.send(this.activeContact.id, this.draft.trim());
     this.messages.push({
      body: this.draft, 
      mine: true,
      sender: this.authService.loggedInUser(),
      recipient: this.activeContact,
      convId: this.peerId
    });
    this.draft = '';
   
  }


  openChat(contact: any) {
    this.peerId = contact.convId;
    this.activeContact = contact.peer; // Set the active contact
    this.messages = []; // Clear previous messages

    //make all messages read
    contact.unread = 0; // Reset unread count for the selected contact
    this.chat.requestHistory(this.peerId); // Request new history for the selected contact

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}