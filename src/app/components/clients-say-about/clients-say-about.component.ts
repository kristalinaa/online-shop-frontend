import { Component } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ClientCardComponent } from '../client-card/client-card.component';

@Component({
  selector: 'app-clients-say-about',
  imports: [AngularSvgIconModule, ClientCardComponent],
  templateUrl: './clients-say-about.component.html',
  styleUrl: './clients-say-about.component.css'
})
export class ClientsSayAboutComponent {
  clients: any[] = [
    {
      key: 'kevin-wright',
      photo: 'assets/clients/f1.PNG',
      name: 'Kevin Wright',
      position: 'Entrepreneur',
      company: {
        name: 'SuperFast',
        photo: 'assets/clients/ge.svg',
      },
      stars: 5,
      feedback:
        'Working with your dedicated team was a game-changer for our business. Their expertise and commitment to excellence made our project a huge success. It was my honor to work with your team!',
    },
    {
      key: 'sarah-johnson',
      photo: 'assets/clients/f2.PNG',
      name: 'Sarah Johnson',
      position: 'Marketing Director',
      company: {
        name: 'BondNEX',
        photo: 'assets/clients/google-cloud.svg',
      },
      stars: 4,
      feedback:
        "Your team's professionalism and attention to detail exceeded our expectations. They delivered a flawless project that greatly impacted our market presence.",
    },
    {
      key: 'michael-davis',
      photo: 'assets/clients/f3.PNG',
      name: 'Michael Davis',
      position: 'CTO',
      company: {
        name: '123 Industries',
        photo: 'assets/clients/google.svg',
      },
      stars: 5,
      feedback:
        'The level of dedication and the quality of work your team provided were outstanding. They not only met our project requirements but also saved us time and resources.',
    },
    {
      key: 'david-brown',
      photo: 'assets/clients/f4.PNG',
      name: 'David Brown',
      position: 'Product Development Lead',
      company: {
        name: 'PQR Innovations',
        photo: 'assets/clients/netflix.svg',
      },
      stars: 5,
      feedback:
        "Your team's creative approach and problem-solving skills were invaluable to our project. They consistently went above and beyond, delivering results that exceeded our expectations.",
    },
    {
      key: 'emily-white',
      photo: 'assets/clients/f5.PNG',
      name: 'Emily White',
      position: 'Operations Manager',
      company: {
        name: 'LMN Solutions',
        photo: 'assets/clients/microsoft.svg',
      },
      stars: 5,
      feedback:
        'I was thoroughly impressed with the efficiency and effectiveness of your team. They managed the project seamlessly, and their solutions were innovative and cost-effective.',
    },
    {
      key: 'jessica-williams',
      photo: 'assets/clients/f6.PNG',
      name: 'Jessica Williams',
      position: 'Chief Marketing Officer',
      company: {
        name: 'BondNEX',
        photo: 'assets/clients/airbnb.svg',
      },
      stars: 5,
      feedback:
        "I can't express enough how grateful I am for the exceptional work your dedicated team provided during our recent project. As the Chief Marketing Officer, I've had the privilege of working with many teams and agencies over the years, but the experience with your team was truly extraordinary.",
    },
  ];
}
