import { CommonModule, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { StripeService } from 'src/app/services/payment-gateway/stripe.service';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [NgIf, CommonModule, RouterModule],
  templateUrl: './membership.component.html',
  styleUrl: './membership.component.scss',
})
export class MembershipComponent implements OnInit, OnDestroy {
  cardDetailsAndHistory: any;
  errorMessage: string = '';
  constructor() {}

  ngOnInit(): void {
    this.fetchCardDetailsAndNextPayment();
  }

  async fetchCardDetailsAndNextPayment() {
    // const sub = await this.stripeService.customerPayment().subscribe({
    //   next: (response) => {
    //     if (response.success) {
    //       this.cardDetailsAndHistory = response.body;
    //     } else {
    //       this.errorMessage = response.message;
    //     }
    //   },
    //   error: (error) => {},
    //   complete: () => {
    //     sub.unsubscribe();
    //   },
    // });
  }
  ngOnDestroy(): void {}
}
