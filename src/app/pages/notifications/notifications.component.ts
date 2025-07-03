import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification/notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notifications',
  imports: [CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements   OnInit{

  notifications: any[] = []; // Adjust type as needed
  constructor(private notificationService: NotificationService) { }
  
  ngOnInit(): void {
   this.fetchNotifications()
  }
  async fetchNotifications() {
    try {
      const notifications = await this.notificationService.getPerUser().subscribe(
        (data) => {
          this.notifications = data; // Assuming data is an array of notifications
          console.log('Notifications fetched successfully:', this.notifications);
        },
        (error) => {
          console.error('Error fetching notifications:', error);
          throw error; // Re-throw to handle it in the catch block
        }
      );
      console.log('Fetched notifications:', notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  }
}
