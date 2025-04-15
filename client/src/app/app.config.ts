import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './shared/interceptor/jwt.interceptor';

import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { UserService } from './shared/services/user.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideCharts(withDefaultRegisterables()),
    provideAppInitializer(() => {
      const userService = inject(UserService);
      return userService.loadUserOnAppStart();
    }),
  ],
};
