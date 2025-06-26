import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-card',
  imports: [RouterModule, NgIf],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  @Input() product!: any;

  constructor(
    private  router: Router
  ){

  }

  getImage(){
    return 'http://localhost:3000/files/' + this.product.attachments[0].fileName
  }

  navigateToProduct(){
    this.router.navigate(['/company/single-product/',this.product.id])
  }
}
