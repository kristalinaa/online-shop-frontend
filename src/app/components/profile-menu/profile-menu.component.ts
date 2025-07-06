import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule, NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification/notification.service';
import { filter, Observable } from 'rxjs';


@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [ClickOutsideDirective, NgClass, CommonModule, RouterLink, AngularSvgIconModule],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;

  public isCompanyProfile: boolean = false;
  userDetails!: any;
  hasCreatedOtherEntity: boolean = false;
  defaultProfileIsTransporter: boolean = false;
  unreadCount$!: Observable<number>;

  actualProfile: string | null = null;
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationSvc: NotificationService,
  ) { 
    this.unreadCount$ = this.notificationSvc.unreadCount$;

  }

  ngOnInit(): void {
    this.userDetails = this.authService.loggedInUser();
    this.notificationSvc.stream$
      .pipe(filter(Boolean))       // skip initial null
      .subscribe(n => { console.log('New notification:', n); });
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  notification(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isRole(role: string) {
    return this.authService.isRole(role)
  }

  signOut() {
    this.authService.signOutUser();
  }

  goToNotifications() {
    this.notificationSvc.markAllRead();     // reset badge
    this.router.navigate(['/notifications']);
  }

  gotToChatMessages() {
    // this.notificationSvc.markAllRead();     // reset badge
    this.router.navigate(['/chat']);
  }
}