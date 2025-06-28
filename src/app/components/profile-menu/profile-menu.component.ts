import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
  standalone: true,
  imports: [ClickOutsideDirective, NgClass, NgIf,RouterLink, AngularSvgIconModule],
})
export class ProfileMenuComponent implements OnInit {
  public isMenuOpen = false;

  public isCompanyProfile: boolean = false;
  userDetails!: any;
  hasCreatedOtherEntity: boolean = false;
  defaultProfileIsTransporter: boolean = false;

  actualProfile: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userDetails = this.authService.loggedInUser();
    
  }

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  notification(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  isRole(role: string){
    return this.authService.isRole(role)
  }

  signOut() {
    this.authService.signOutUser();
  }

  goToNotifications(){
    this.router.navigate(['/notifications']);
  }
}