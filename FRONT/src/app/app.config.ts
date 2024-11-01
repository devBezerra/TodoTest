import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { authInterceptor } from './shared/interceptors/auth.interceptor';
import { MessageService } from 'primeng/api';
import { SnackInterceptor } from './shared/interceptors/snack.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([SnackInterceptor, authInterceptor])),
    AuthGuard,
    MessageService,
  ],
};
