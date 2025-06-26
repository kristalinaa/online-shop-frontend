import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { CategoryNodeComponent } from '../category-node/category-node.component';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, CategoryNodeComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{

  categories: any[] = []
  constructor(private adminService: AdminService){

  }


  ngOnInit(): void {
    this.fetchData()
  }


  async fetchData() {
    await this.adminService.getAllCategories().subscribe({
      next: (response) => {
        this.categories = response
      },
      error: (error) => {

      },
      complete: () => {

      }
    })
  }
}
