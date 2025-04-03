import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../services/product/product.service';

import {MatFormField, MatSelectModule } from '@angular/material/select'

@Component({
  selector: 'app-create-product',
  imports: [CommonModule, RouterModule, ReactiveFormsModule,MatSelectModule, FormsModule,MatFormField],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent implements OnInit {

  colorOptions = [
    "#EAE0D5",
    "#C2948A",
    "#7EA8BE",
    "#CEFDFF"
  ]
  productForm!: FormGroup;
  selectedFiles: File[] = [];
  imagePreviews: string[] = [];


  categories: any[] = []
  previousCategories: any[] = []
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories()
  }
  initForm() {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      details: ['', Validators.required],
      color: ['', ],

      category: ['',Validators.required],
      size: ['',],

    });
  }


  async getCategories(){
    await this.productService.getCategories().subscribe({
      next: (response ) => {
        this.categories = response;
      },
      error: (error) => {

      }
    })
  }


  async onSelectCategory(event: any){
    console.log("categoryL ", event.target.value)
    let category = {
      id: event.target.value
    }
    //check if i have children
    await this.productService.getChildren(category.id).subscribe({
      next: (response: any ) => {
        if(response.children.length == 0){
          //no more children 
          this.productForm.patchValue({category: category.id})
        }
       else {
        this.previousCategories = this.categories;
        this.categories = response.children;
        this.productForm.patchValue({category:null})
       }

      },
      error: (error) => {

      }
    })
  }
  

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

  async submit() {
    const formData = new FormData();
    const formValues = this.productForm.getRawValue();
    for (let file of this.selectedFiles) {
      formData.append('files', file);
    }
    formData.append('object', JSON.stringify(formValues));
    console.log('FormData entries:');

    await this.productService.saveProduct(formData).subscribe({
      next: (response ) =>{
        this.toastr.success("Product created successfully", "Success");
        this.productForm.reset();
      },
      error: (error) => {
        this.toastr.error("Error on creating product", "Error")

      },
      complete: () => {

      }
    })
    
  }
}
