import { Component, OnInit } from '@angular/core';
import { BagService } from '../../../services/bag/bag.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.css'
})
export class ShoppingCartComponent implements OnInit{

   bagRecords: any[] = []

  constructor(private bagService: BagService){

  }

  ngOnInit(): void {
    this.fetchData()
  }
  
  
  async fetchData(){
    const sub = await this.bagService.productOnBagPerUser().subscribe({
      next: (response) => {
        this.bagRecords = response;
      },
      error: (error) => {
        //handle error
      },
      complete: () => {
        sub.unsubscribe()
      }
    })
  }


  async removeBagItem(bagItem: any){
    const sub = await this.bagService.removeBagItem(bagItem.id).subscribe({
      next: (response) => {
        this.bagRecords = this.bagRecords.filter(it => it.id != bagItem.id);
      },
      error: (error) => {
        //handle error
      },
      complete: () => {
        sub.unsubscribe()
      }
    })
  }


  getSubTotal() {
    return this.bagRecords.reduce((total, bag) => {
      const price = bag.product?.price ?? 0;
      const quantity = bag.quantity ?? 0;
      return total + price * quantity;
    }, 0);
  }
  getImage(product: any){
    return 'http://localhost:3000/files/' + product.attachments[0].fileName
  }
    
}
