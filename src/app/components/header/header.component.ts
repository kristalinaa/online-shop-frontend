import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {


  isUserLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService) {
    this.isUserLoggedIn = this.authService.loggedInUser() != null
    
  } 

  signOut(){
    this.authService.signOutUser()
  }

}
