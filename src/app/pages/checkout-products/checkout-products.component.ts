import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout/checkout.service';
import { ActivatedRoute, Route } from '@angular/router';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-checkout-products',
  imports: [NgFor, CommonModule,CardComponent],
  templateUrl: './checkout-products.component.html',
  styleUrl: './checkout-products.component.css'
})
export class CheckoutProductsComponent implements OnInit {

  items: any[] = []

  constructor(private checkoutService: CheckoutService, private route: ActivatedRoute){


  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if(id)
    this.fetchData(+id)
  }
  async fetchData(id: number){
    const sub = await this.checkoutService.getSingleCheckoutItems(id).subscribe({
      next: (response) => {
        this.items = response[0].soldItems.map((it: any)=> it.product);
      },
      error: (error) => {
        //handle error
      },
      complete: () => {
        sub.unsubscribe()
      }
    })
  }
}
