import { CommonModule, NgIf } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-edit-dialog',
  imports: [CommonModule, NgIf],
  templateUrl: './user-edit-dialog.component.html',
  styleUrl: './user-edit-dialog.component.css'
})
export class UserEditDialogComponent {


  user: any | undefined;
  constructor(
    public dialogRef: MatDialogRef<UserEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private toasterService:ToastrService
  ) {

    this.user = data;

  }

  async changeStatus(arg0: string) {
    if (this.user) {
      this.user.status = arg0;
      await this.userService.updateUserGenericData(this.user).subscribe({
        next: (response) => {
          this.close(response);
          this.toasterService.success('User status updated successfully');
        },
        error: (error) => {
          console.error('Error updating user status:', error);
          this.toasterService.error('Error updating user status');
          this.close();
        },

        complete: () => { }
      });
    }

  }


  deleteUser() {
    if (this.user) {
      this.userService.deleteUser({ ...this.user }).subscribe({
        next: (response) => {
          this.toasterService.success('User deleted successfully');
          this.close({response, action: 'delete'});
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.toasterService.error('Error deleting user');
          this.close();
        }
      });
    }
}
  close(result?: any) {
    this.dialogRef.close(result);
  }
}

