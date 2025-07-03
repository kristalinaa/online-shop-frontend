import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FirstSectionComponent } from '../../components/first-section/first-section.component';
import { ClientsSayAboutComponent } from '../../components/clients-say-about/clients-say-about.component';
import { TalkWithAgentComponent } from '../../components/talk-with-agent/talk-with-agent.component';
import { StatsComponent } from '../../components/stats/stats.component';
import { CollectionComponent } from '../../components/collection/collection.component';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    FirstSectionComponent,
    ClientsSayAboutComponent,
    TalkWithAgentComponent,
    StatsComponent,
    CollectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  ctaSection: any = {
    title:
      'Empowering buyers and sellers to connect, trade, and grow',
    selectedTitle: '',
    description: '',
    button: {
      label: 'Shop Now',
      href: '/marketplace',
    },
    photo: 'assets/case-2.jpeg',
    photoPosition: 'right',
  };

  agent: any = {
    label: 'kristalina-agent',
    firstName: 'Kristalina',
    lastName: 'Agent',
    photo: '/assets/clients/f1.PNG',
    phoneNumber: '+1 843 303 3243',
    email: 'kristalina.agent@bondcom.co',
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
    this.isUserLoggedIn = this.authService.loggedInUser() != null;
  }

  ngOnInit(): void {}

  navigateToAnotherPage() {
    this.router.navigate(['/auth/login']);
  }

  signOut() {
    this.authService.signOutUser();
    window.location.reload();
  }
  ngOnDestroy(): void {}
}
