import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from '../../../dialogs/user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {

  userList: any[]  = []
  role: string | null = 'all';
  constructor(private adminService: AdminService,private rotuer: Router, private route: ActivatedRoute, private dialog: MatDialog){

  }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      const tab = params['tab']; 
      this.role = tab;

      this.fetchData(this.role)

    });
  }


  async fetchData(role?: string | null){
    await this.adminService.getUsersByRole(role).subscribe({
      next: (response) => {
        this.userList = response;
      },
      error: (error) => {
        
      },
      complete: () => {

      }
    })
  }


  selectTab(tab: string): void {
    this.role = tab;
    this.rotuer.navigate([], {
      relativeTo: this.route,

      queryParams: {
        tab: tab
      }
    })
    // this.fetchData(this.role)
  }


  openEditUserDialog(category: any) {
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px',
      data: category
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        // Do status update here
        console.log('Confirmed for:', category);
      }
    });
  }
}
