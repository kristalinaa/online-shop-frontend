import { DatePipe, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountSettingsService } from '../../../services/account-settings/account-settings.service';

@Component({
  selector: 'app-login-security',
  standalone: true,
  imports: [RouterModule, DatePipe, NgIf],
  templateUrl: './login-security.component.html',
  styleUrl: './login-security.component.scss',
})
export class LoginSecurityComponent implements OnInit, OnDestroy {
  loginSecurityInfo: any;
  subs!: Subscription;
  constructor(
    private accountSettingService: AccountSettingsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    this.subs = await this.accountSettingService
      .getLoginSecurityInfo()
      .subscribe((response: any) => {
        this.loginSecurityInfo = response.body;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
