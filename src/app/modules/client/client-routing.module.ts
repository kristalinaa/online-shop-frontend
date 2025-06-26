import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClientComponent } from './client.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { AuthGuard } from '../../auth.guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutListComponent } from './checkout-list/checkout-list.component';
''

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [AuthGuard] },
      { path: 'checkout-list', component: CheckoutListComponent, canActivate: [AuthGuard] },

      { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },

      
      //   { path: 'history-routes', component: MyHistoryRouteComponent, canActivate: [AuthGuardService] },
    //   { path: 'active-routes', component: MyActiveRouteComponent, canActivate: [AuthGuardService] },
    //   { path: 'notification', component: NotificationComponent, canActivate: [AuthGuardService] },

      // { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },

      { path: '**', redirectTo: 'error/404' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
})
export class ClientRoutingModule { }