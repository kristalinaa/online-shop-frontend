import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { ProductService } from '../../../services/product/product.service';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-company-products',
  standalone: true,
  imports: [CardComponent,NgFor, RouterLink],
  templateUrl: './company-products.component.html',
  styleUrl: './company-products.component.css'
})
export class CompanyProductsComponent implements OnInit{
  list: any[] = []
  constructor(
    private productService: ProductService
  ){

  }

  ngOnInit(): void {
    this.fetchData()
  }

  async fetchData(){
    await this.productService.getProducts().subscribe({
      next: (response) => {
        this.list = response
      },
      error: (error)=> {
        //display error
      }
    })
  }
}
