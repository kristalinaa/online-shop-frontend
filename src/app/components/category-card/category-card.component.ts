import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
  @Input() category: any;
  @Input() index: any;


  colors: any[] = ['bg-[#36F1CD]','bg-[#FFE1A8]','bg-[#79C7C5]','bg-[#E2ADF2]']

  constructor(
    private router: Router
  ){

  }

  navigateToCategory(){
    this.router.navigate(['/product-list'], {queryParams: {
      category: this.category.name,
      categoryId: this.category.id
    }})
  }
}
