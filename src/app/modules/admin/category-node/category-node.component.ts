import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-node',
  imports: [CommonModule],
  templateUrl: './category-node.component.html',
  styleUrl: './category-node.component.css'
})
export class CategoryNodeComponent {
  @Input() category: any;
  isOpen: boolean = false;

  toggle() {
    this.isOpen = !this.isOpen;
  }

  onAdd(category: any) {
    console.log('Add subcategory to', category);
    // open add form or emit event
  }

  onEdit(category: any) {
    console.log('Edit category', category);
    // open edit modal or emit event
  }

  onDelete(category: any) {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      console.log('Delete', category);
      // call delete API or emit event
    }
  }
}
