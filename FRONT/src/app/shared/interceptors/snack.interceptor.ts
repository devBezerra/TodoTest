import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const SnackInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next
) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    map((event: any) => {
      if (event.type === 4 && req.method !== 'GET') {
        const message = event.body.message;
        if (!!message) {
          messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: event.body.message,
          });
        }
      }
      return event;
    }),
    catchError((error) => {
      messageService.add({
        severity: 'error',
        summary: 'Ops',
        detail: error.error.errors
          ? error.error.errors.Name[0]
          : error.error.message,
      });
      return throwError(() => error);
    })
  );
};
