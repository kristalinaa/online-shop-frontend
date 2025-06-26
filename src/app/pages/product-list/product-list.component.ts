import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-product-list',
  imports: [CommonModule, CardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent implements OnInit {
  categories: any[] = []
  products: any[] = [];
  params: any;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ){

  }

  ngOnInit(): void {
    this.fetchData()

    this.route.queryParams.subscribe(params => {
     this.params = params
      this.fetchData()
      if(params['categoryId'])
      this.getAncestors(params['categoryId'])

    });
  }

  async fetchData(){
    await this.productService.getListProductsPerCategory(this.params).subscribe({
      next: (response) => {
        this.products = response
      },
      error: (error)=> {
        //display error
      }
    })
  }

  async getAncestors(id: number){
    await this.productService.getAncestors(id).subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (error) => {

      }
    })
  }
}
