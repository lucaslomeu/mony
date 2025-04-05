import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../shared/auth.service';

export const AuthGuardCanActive: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = inject(AuthService).isAuthenticated();

  if (!isAuthenticated) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
