import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../../services/checkout/checkout.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-list',
  imports: [CommonModule],
  templateUrl: './checkout-list.component.html',
  styleUrl: './checkout-list.component.css'
})
export class CheckoutListComponent implements OnInit{

  checkoutList: any[] = []

 constructor(private checkoutService: CheckoutService, private router: Router){

 }

 ngOnInit(): void {
   this.fetchData()
 }
 
 
 async fetchData(){
   const sub = await this.checkoutService.getCheckoutList().subscribe({
     next: (response) => {
       this.checkoutList = response;
     },
     error: (error) => {
       //handle error
     },
     complete: () => {
       sub.unsubscribe()
     }
   })
 }


 gotoMarketPlace(){
  this.router.navigate(['/marketplace'])
 }


 viewProducts(checkoutId: any){
  this.router.navigate(['/checkout-products', checkoutId]);

 }

   
}