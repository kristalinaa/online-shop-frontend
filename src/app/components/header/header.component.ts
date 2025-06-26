import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';
import { ProfileMenuComponent } from '../profile-menu/profile-menu.component';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf , BannerComponent, ProfileMenuComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isUserLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService) {
    this.isUserLoggedIn = this.authService.loggedInUser() != null;

  }

  isRole(role: string){
    return this.authService.isRole(role)
  }

  signOut() {
    this.authService.signOutUser();
  }
}
