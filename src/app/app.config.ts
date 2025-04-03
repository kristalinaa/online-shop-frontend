import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideAngularSvgIcon } from 'angular-svg-icon';
import { AuthInterceptor } from './interceptor/auth.interceptor';

export const appConfig: ApplicationConfig = {
  
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-center',

    }),
    provideHttpClient(withInterceptorsFromDi()), // Support DI-based interceptors

    {provide: HTTP_INTERCEPTORS,useClass: AuthInterceptor, multi: true},
  provideAngularSvgIcon()]
};
