import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { MembershipComponent } from './membership/membership.component';
import { OverviewComponent } from './overview/overview.component';
import { ChangePlanComponent } from './change-plan/change-plan.component';
import { LoginSecurityComponent } from './login-security/login-security.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', component: OverviewComponent, canActivate: [] },

      { path: 'membership', component: MembershipComponent, canActivate: [] },
      { path: 'change-plan', component: ChangePlanComponent, canActivate: [] },
      {
        path: 'login-security',
        component: LoginSecurityComponent,
        canActivate: [],
      },

      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
