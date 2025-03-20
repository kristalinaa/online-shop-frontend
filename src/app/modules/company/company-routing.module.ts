import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { CompanyComponent } from './company.component';


const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'create-product', component: CreateProductComponent, canActivate: [] },
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
export class CompanyRoutingModule { }