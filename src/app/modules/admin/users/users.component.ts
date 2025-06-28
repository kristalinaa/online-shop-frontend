import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UserEditDialogComponent } from '../../../dialogs/user-edit-dialog/user-edit-dialog.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule, FormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit {


  allUsers: any[] = [];
  userList: any[] = [];

  searchTerm = '';
  role: string | null = 'all';

  constructor(
    private adminService: AdminService,
    private router: Router,               // <-- typo fixed
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) { }

  /* ------------------------------------------------------------------ */
  /* 1. Lifecycle                                                       */
  /* ------------------------------------------------------------------ */

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.role = params['tab'] ?? 'all';
      this.fetchData(this.role);
    });
  }

  /* ------------------------------------------------------------------ */
  /* 2. Data loading                                                    */
  /* ------------------------------------------------------------------ */

  fetchData(role?: string | null): void {
    this.adminService.getUsersByRole(role).subscribe({
      next: users => {
        this.allUsers = users;
        this.userList = [...users];  // show everything first
        this.onSearch();             // apply any existing filter
      },
      error: err => {
        console.error('Error fetching users:', err);
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* 3. Filter logic                                                    */
  /* ------------------------------------------------------------------ */

  onSearch(): void {


    const term = this.searchTerm.trim().toLowerCase();

    this.userList = !term
      ? [...this.allUsers]
      : this.allUsers.filter(u =>
        u.email.toLowerCase().includes(term) ||
        u.firstName.toLowerCase().includes(term) ||
        u.lastName.toLowerCase().includes(term)

        // || u.phone?.toLowerCase().includes(term) // add more fields if needed
      );
  }

  /* ------------------------------------------------------------------ */
  /* 4. Tab navigation                                                  */
  /* ------------------------------------------------------------------ */

  selectTab(tab: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab },
    });
    // fetchData will be triggered by queryParams subscription
  }

  /* ------------------------------------------------------------------ */
  /* 5. Dialog                                                          */
  /* ------------------------------------------------------------------ */

  openEditUserDialog(event: any,user: any): void {

    event.stopPropagation(); // Prevent row click event
    const dialogRef = this.dialog.open(UserEditDialogComponent, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirmed') {
        console.log('Confirmed for:', user);
        // Possibly re-fetch or update the list here
      }
      else if (result?.action === 'delete') {
        this.fetchData(this.role); // Refresh the list after deletion
      }
      else {
        console.log('Dialog closed without confirmation');
      }
    });
  }

  onUserSelect(user: any): void {
    console.log('Selected user:', user);
    this.router.navigate(['/user-profile', user.id, user.firstName], {
      queryParams: { tab: 'profile' } // Optional: pass tab param if needed 
    })
  }
}

