import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-single-product',
  imports: [NgIf,NgFor],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent implements OnInit{

  product: any;
  productId: number;
  mainImageFileName: string = ""

  categories: any[] = []
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute){
    this.productId = this.activatedRoute.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.fetchData(this.productId)
  }


  async fetchData(id: number){
    await this.productService.getProductDetails(id).subscribe({
      next: (response) => {
        //succes
        this.product = response
        this.mainImageFileName = this.product.attachments[0].fileName;
        this.getAncestors(this.product.category.id)
      },
      error: (error) => {
        //maanage errro
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
  changeMainImage(image: any) {
    this.mainImageFileName = image.fileName
  }

  getImage(path: string){
    return 'http://localhost:3000/files/' + path
  }
}
