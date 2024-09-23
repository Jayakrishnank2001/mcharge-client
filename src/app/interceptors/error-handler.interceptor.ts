import { HttpInterceptorFn } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      handleHttpError(error);
      return throwError(() => error);
    })
  );
};

function handleHttpError(error: HttpErrorResponse): void {
    const _snackBar = inject(MatSnackBar)

  let errorMessage = 'An error occurred';
  if (error.error instanceof ErrorEvent) {
    errorMessage = `: ${error.error.message}`;
  } else {
    errorMessage = `${error.error.message || error.statusText}`;
  }

  _snackBar.open(errorMessage, 'Close', {
    duration: 5000,
    verticalPosition: 'top',
  });
  console.error(errorMessage);
}
