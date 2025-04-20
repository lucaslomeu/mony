import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './shared/interceptor/jwt.interceptor';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { UserService } from './shared/services/user.service';
import { AuthService } from './shared/services/auth.service';

async function appInitializer() {
  const userService = inject(UserService);
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = authService.isAuthenticated();

  if (isAuthenticated) {
    await userService.loadUserOnAppStart();
    router.navigate(['/dashboard']);
  } else {
    router.navigate(['/auth/login']);
  }

  return new Promise<void>((resolve) => {
    resolve();
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideCharts(withDefaultRegisterables()),
    provideAppInitializer(appInitializer),
  ],
};
