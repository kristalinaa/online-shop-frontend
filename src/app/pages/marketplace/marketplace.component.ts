import { Component, OnInit } from '@angular/core';
import { MarketplaceBannerComponent } from '../../components/marketplace-banner/marketplace-banner.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { NgFor } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { PopularProductComponent } from "../../components/popular-product/popular-product.component";
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-marketplace',
  imports: [MarketplaceBannerComponent, CategoryCardComponent, NgFor, CardComponent, PopularProductComponent],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css',
})
export class MarketplaceComponent implements OnInit {

  categories: any[] = [];

  constructor(
    private productService: ProductService
  ){

  }
  ngOnInit(): void {
    this.fetchRootCategories()
  }


  async fetchRootCategories(){
    const getRootSub =  await this.productService.getRootCategories().subscribe({
      next: (response) => {
        this.categories = response
      },
      error: (error) => {
        //Handle error 
      },
      complete: () => {
        getRootSub.unsubscribe()
      }
    })
  }
}
