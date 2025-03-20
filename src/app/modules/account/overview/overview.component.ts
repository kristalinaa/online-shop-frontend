import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss',
})
export class OverviewComponent {
  constructor(private authService: AuthService) {}

  goToProfile() {
    // this.authService.navigateToProfile(this.authService.bondcom_current_user.roles);
  }
}
