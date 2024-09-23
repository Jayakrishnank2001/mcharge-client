import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('Token');

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
