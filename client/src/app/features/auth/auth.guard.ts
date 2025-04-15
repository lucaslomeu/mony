import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { catchError, map, of, take } from 'rxjs';

export const AuthGuardCanActive: CanActivateFn = () => {
  const router = inject(Router);
  const userService = inject(UserService);

  return userService.currentUser$.pipe(
    take(1),
    map((user) => {
      if (!user) {
        router.navigate(['/auth/login']);
        return false;
      }

      return true;
    }),
    catchError(() => {
      router.navigate(['/auth/login']);
      return of(false);
    })
  );
};
