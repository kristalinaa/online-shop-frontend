import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-product',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  selectedFiles: File[] = [];
  imagePreviews: string[] = [];

  // Handle multiple file selection
  onFilesSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFiles = [];
      this.imagePreviews = [];

      for (let file of files) {
        this.selectedFiles.push(file);

        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  submit() {
    const formData = new FormData();
    const formValues = this.productForm.getRawValue();
    for (let file of this.selectedFiles) {
      formData.append('images', file);
    }
    formData.append('productData', JSON.stringify(formValues));
    console.log('FormData entries:');
    formData.forEach((value, key) => {
      console.log(key, value);
    });  }
}
