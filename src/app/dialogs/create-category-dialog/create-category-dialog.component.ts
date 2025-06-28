import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from '../../services/category/category.service';
import { ToastrService } from 'ngx-toastr';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-create-category-dialog',
  imports: [FormsModule, ReactiveFormsModule, FormsModule, NgIf],
  templateUrl: './create-category-dialog.component.html',
  styleUrl: './create-category-dialog.component.css'
})
export class CreateCategoryDialogComponent {


  categoryFormGroup: FormGroup = new FormGroup({});
  parentCategory: any | undefined;
  editMode: boolean = false;
  constructor(private dialogRef: MatDialogRef<CreateCategoryDialogComponent>, private categoryService: CategoryService,
    private toasterService: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.parentCategory = data.category;
    this.editMode = data.editMode || false;
    this.initForm();

    if(this.editMode){
      this.categoryFormGroup.patchValue({
        name: this.parentCategory.name
      });
    }
  }

  initForm() {
    this.categoryFormGroup = new FormGroup({
      name: new FormControl('', [Validators.required])
    });
  }


  async createCategory() {
    if (this.categoryFormGroup.valid) {
      const categoryData = {
        parent: this.parentCategory ? this.parentCategory.id: null,
        name: this.categoryFormGroup.value.name,
      };

      await this.categoryService.createCategory(categoryData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.toasterService.success('Category created successfully');
        },
        error: (error) => {
          console.error('Error creating category:', error);
          this.toasterService.error('Error creating category');
          this.dialogRef.close();
        },
        complete: () => {
          console.log('Category creation completed');
        }
      });
    }
  }


  async updateCategory() {
   if (this.categoryFormGroup.valid) {
      const categoryData = {
        id: this.parentCategory.id,
        name: this.categoryFormGroup.value.name,
      };

      await this.categoryService.updateCategory(categoryData).subscribe({
        next: (response) => {
          this.dialogRef.close(response);
          this.toasterService.success('Category updated successfully');
        },
        error: (error) => {
          console.error('Error updating category:', error);
          this.toasterService.error('Error updating category');
          this.dialogRef.close();
        },
        complete: () => {
          console.log('Category updation completed');
        }
      });
    }
}
}
