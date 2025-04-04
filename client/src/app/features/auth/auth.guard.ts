import { CanActivateFn } from '@angular/router';

export const AuthGuardCanActive: CanActivateFn = (route, state) => {
  return true;
};
