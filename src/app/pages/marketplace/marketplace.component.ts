import { Component } from '@angular/core';
import { MarketplaceBannerComponent } from '../../components/marketplace-banner/marketplace-banner.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { NgFor } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';

@Component({
  selector: 'app-marketplace',
  imports: [MarketplaceBannerComponent, CategoryCardComponent, NgFor,CardComponent],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css',
})
export class MarketplaceComponent {
  categories: any[] = [1, 2, 3, 4];
}
