import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { CheckoutProductsComponent } from './pages/checkout-products/checkout-products.component';
import { AuthGuard } from './auth.guard';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { ChatComponent } from './pages/chat/chat.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: 'company',
    loadChildren: () =>
      import('./modules/company/company.module').then((m) => m.CompanyModule),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./modules/client/client.module').then((m) => m.ClientModule),
  },

  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./modules/account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'marketplace',
    component: MarketplaceComponent,
  },
  {
    path: 'checkout-products/:id',
    component: CheckoutProductsComponent,
  },
  {
    path: 'product-list',
    component: ProductListComponent,
  },
  {
    path: 'user-profile/:id/:firstName',
    component: UserProfileComponent
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'chat/:peerId',
    component: ChatComponent
  }
];
