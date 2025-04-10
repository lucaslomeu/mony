import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(AuthService).getAuthToken();

  if (authToken) {
    // req = req.clone({
    //   setHeaders: {
    //     Authorization: `Bearer ${authToken}`,
    //   },
    // });

    const headers = new HttpHeaders().append(
      'Authorization',
      `Bearer ${authToken}`
    );

    req = req.clone({
      headers,
    });
  }

  return next(req);
};
