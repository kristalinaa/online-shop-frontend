import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateCategoryDialogComponent } from '../../../dialogs/create-category-dialog/create-category-dialog.component';

@Component({
  selector: 'app-category-node',
  imports: [CommonModule],
  templateUrl: './category-node.component.html',
  styleUrl: './category-node.component.css'
})
export class CategoryNodeComponent {
  @Input() category: any;
  isOpen: boolean = false;


  constructor(
    private dialog: MatDialog
  ){

  }
  toggle() {
    this.isOpen = !this.isOpen;
  }

  onAdd(category: any) {
    console.log('Add subcategory to', category);

    this.openCreateCategoryDialog()
    // open add form or emit event
  }

  onEdit(category: any) {
    console.log('Edit category', category);
    // open edit modal or emit event
    this.openCreateCategoryDialog(true);
  }

  onDelete(category: any) {
    if (confirm(`Are you sure you want to delete "${category.name}"?`)) {
      console.log('Delete', category);
      // call delete API or emit event
    }
  }



  
    openCreateCategoryDialog(editMode: boolean = false): void {

       const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
        width: '400px',
        data: {
          editMode: editMode,
          category: this.category ? this.category : null
        },
      
      });
  
      dialogRef.afterClosed().subscribe(result => {
       
      });
     
    }


}
