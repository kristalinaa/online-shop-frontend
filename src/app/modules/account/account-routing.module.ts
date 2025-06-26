import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { MembershipComponent } from './membership/membership.component';
import { OverviewComponent } from './overview/overview.component';
import { ChangePlanComponent } from './change-plan/change-plan.component';
import { LoginSecurityComponent } from './login-security/login-security.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { AddCardComponent } from './add-card/add-card.component';
import { ViewCardComponent } from './view-card/view-card.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      { path: '', component: OverviewComponent, canActivate: [] },

      { path: 'membership', component: MembershipComponent, canActivate: [] },
      { path: 'credit-cards', component: CreditCardComponent, canActivate: [] },
      { path: 'new-card', component: AddCardComponent, canActivate: [] },
      { path: 'view-card/:id', component: ViewCardComponent, canActivate: [] },

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
