import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-popular-product',
  imports: [NgFor, RouterModule],
  templateUrl: './popular-product.component.html',
  styleUrl: './popular-product.component.css'
})
export class PopularProductComponent implements OnInit {

  @Input() title: string = ""
  @Input() category: string = ""

  products: any[] = []

  colors: any[] = ['#36F1CD','#FFE1A8','#79C7C5','#E2ADF2']


  constructor(private productService: ProductService){

  }

  ngOnInit(): void {
    this.fetchData()
  }


  async fetchData(){
    await this.productService.getProductsByCategory(this.category).subscribe({
      next: (response) => {
        this.products = response;
      },
      error: (error) => {

      }
    })
  }

  getImage(path: string){
    return 'http://localhost:3000/files/' + path
  }
}
