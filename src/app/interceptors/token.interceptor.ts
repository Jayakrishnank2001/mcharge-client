import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const platformId = inject(PLATFORM_ID);

  const token = authService.getToken('token');

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {};

  if (token) {
    const modifiedBody = { ...body, token: token };

    const clonedReq = req.clone({
      body: new URLSearchParams(modifiedBody as Record<string, string>).toString(),
      headers: req.headers.set('Content-Type', 'application/x-www-form-urlencoded')
    });

    return next(clonedReq);
  }

  return next(req);
};
