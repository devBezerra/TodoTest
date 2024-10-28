import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { MessageService } from 'primeng/api';
import { throwError } from 'rxjs';

@Injectable()
export class SnackInterceptor implements HttpInterceptor {
  constructor(private messageService: MessageService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (
          event instanceof HttpResponse &&
          event.status >= 200 &&
          event.status < 300
        ) {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Operação realizada com sucesso!',
          });
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const errorMessage =
          error.error?.message || 'Ocorreu um erro inesperado';
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: errorMessage,
        });
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
