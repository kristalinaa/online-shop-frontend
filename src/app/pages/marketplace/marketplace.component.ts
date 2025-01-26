import { Component } from '@angular/core';
import { MarketplaceBannerComponent } from '../../components/marketplace-banner/marketplace-banner.component';
import { CategoryCardComponent } from '../../components/category-card/category-card.component';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-marketplace',
  imports: [MarketplaceBannerComponent, CategoryCardComponent, NgFor],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.css',
})
export class MarketplaceComponent {
  categories: any[] = [1, 2, 3, 4];
}
