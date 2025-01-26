import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, NgIf } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FirstSectionComponent } from "../../components/first-section/first-section.component";
import { ClientsSayAboutComponent } from "../../components/clients-say-about/clients-say-about.component";
import { TalkWithAgentComponent } from "../../components/talk-with-agent/talk-with-agent.component";
import { StatsComponent } from "../../components/stats/stats.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, HeaderComponent, FooterComponent, FirstSectionComponent, ClientsSayAboutComponent, TalkWithAgentComponent, StatsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  ctaSection: any = {
    title:
      'We are on a mission to embrace a culture of speaking up in organizations all over the world',
    selectedTitle: '',
    description: '',
    button: {
      label: 'How it all started',
      href: '#how-it-started',
    },
    photo: 'assets/case-2.jpeg',
    photoPosition: 'right',
  };


  agent: any = {
    label: 'thomas-agent',
    firstName: 'Thomas',
    lastName: 'Agent',
    photo: '/assets/clients/f1.PNG',
    phoneNumber: '+1 843 303 3243',
    email: 'thomas.agent@bondcom.co',
  };

  stats: any[] = [
    {
      key: 'satisfied clients',
      value: '100',
    },
    {
      key: 'countries worldwide',
      value: '6',
    },
    {
      key: 'loads finished',
      value: '2000+',
    },
    {
      key: 'teammates',
      value: '4',
    },
  ];

  isUserLoggedIn: boolean = false;
  constructor(private router: Router, private authService: AuthService) {
    this.isUserLoggedIn = this.authService.loggedInUser() != null
    
  } 


  ngOnInit(): void {
  }
  
  navigateToAnotherPage() { 
    
    this.router.navigate(['/auth/login']); 
  } 


  signOut(){
    this.authService.signOutUser();
    window.location.reload()
  }
  ngOnDestroy(): void {
  }
}

