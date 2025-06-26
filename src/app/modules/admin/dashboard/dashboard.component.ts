import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { Router } from '@angular/router';
import { ProductChartComponent } from "../graphs/product-chart/product-chart.component";

@Component({
  selector: 'app-dashboard',
  imports: [ProductChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  stats: any;
  constructor(private adminService: AdminService, private router: Router){

  }

  ngOnInit(): void {
    this.fetchData()
  }

  async fetchData(){
    await this.adminService.getDashboardStats().subscribe({
      next: (response) => {
        this.stats = response;
      },
      error: (error) => {

      },
      complete: () => {

      }
    })
  }

  goTo(tab: string) {
    this.router.navigate(['/admin/users'], {
      queryParams: {
        tab: tab
      }
    })
  }

  goToProducts(){
    this.router.navigate(['/admin/products'])
  }

  goToCategories(){
    this.router.navigate(['/admin/categories'])

  }
}
