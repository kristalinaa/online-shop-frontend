import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MarketplaceComponent } from './pages/marketplace/marketplace.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule)
    },
    {
        path: "marketplace",
        component: MarketplaceComponent
    }

];
