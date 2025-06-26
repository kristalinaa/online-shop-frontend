import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BankAccountService } from '../../../services/bank-account/bank-account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credit-card',
  imports: [CommonModule],
  templateUrl: './credit-card.component.html',
  styleUrl: './credit-card.component.css'
})
export class CreditCardComponent implements OnInit {

  cards: any[] = []
  constructor(
    private router: Router,
    private bankAccountService: BankAccountService
  ){

  }

  ngOnInit(): void {
    this.fetchBankAccount()
  }

  async fetchBankAccount(){
    await this.bankAccountService.getBankAccounts().subscribe({
      next: (response) => {
        this.cards = response
      },
      error: (error) => {

      },
      complete: () => {

      }
    })
  }

  addNewCard(){
    this.router.navigate(['/account/new-card'])
  }


  viewCard(card: any){
    this.router.navigate(['/account/view-card', card.id])

  }
}
