import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../../components/card/card.component';

@Component({
  selector: 'app-products',
  imports: [CommonModule, CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent  implements OnInit{

  products: any[] = []
  constructor(private adminService: AdminService){

  }


  ngOnInit(): void {
    this.fetchData()
  }


  async fetchData() {
    await this.adminService.getAllProducts().subscribe({
      next: (response) => {
        this.products = response
      },
      error: (error) => {

      },
      complete: () => {

      }
    })
  }
}
