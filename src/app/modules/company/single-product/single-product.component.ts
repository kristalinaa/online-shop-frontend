import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { BagService } from '../../../services/bag/bag.service';
import { FormsModule } from '@angular/forms';
import { ConversationService } from '../../../services/conversations/conversation.service';

@Component({
  selector: 'app-single-product',
  imports: [NgIf,NgFor, FormsModule, NgClass],
  templateUrl: './single-product.component.html',
  styleUrl: './single-product.component.css'
})
export class SingleProductComponent implements OnInit{

  product: any;
  productId: number;
  mainImageFileName: string = ""
  quatityOptions: number[] = [];
  categories: any[] = []
  sizeList: string[] = ['XXS','XS','S','M','L','XL','2XL','3XL']
  selectedColor: string | null = null;
  selectedSize: string | null = null;
  selectedQuantity: number = 0;

  errorMessage: string | null = null;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute, private bagService: BagService, private router: Router, private conversationService: ConversationService) {
    this.productId = this.activatedRoute.snapshot.params['id'];

  }

  ngOnInit(): void {
    this.fetchData(this.productId)
  }


  onChangeQuantity(event: any){
    this.selectedQuantity = Number.parseInt(event.target.value)
  }


  async fetchData(id: number){
    await this.productService.getProductDetails(id).subscribe({
      next: (response) => {
        //succes
        this.product = response;
        this.quatityOptions = Array.from({ length: this.product.quantity }, (_, i) => i + 1);
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

  async openChat(userId: number) {

    await this.conversationService.getOrCreate({id: userId}).subscribe({
      next: (response) => {
        this.errorMessage = null;
        // Navigate to the chat page with the conversation ID
        this.router.navigate(['/chat', response.conversationId]);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
      },
      complete: () => {
        // Optionally, you can handle any cleanup or final actions here
      }
    });
    // this.router.navigate(['/chat', userId]);
  }

  //
  async addToBag(){

    const saveToBagData: any = {
      quantity: this.selectedQuantity,
      color: this.selectedColor,
      size: this.selectedSize,
      productId: this.productId
    };


    const saveToBagSub = await this.bagService.saveToBagProduct(saveToBagData).subscribe({
      next: (response) => {
        this.errorMessage = null;
        this.router.navigate(['/client/shopping-cart'])
      },
      error: (error) => {
        this.errorMessage = error.error.message
      },
       complete: () => {
        saveToBagSub.unsubscribe()
       }
    })
  }
}
