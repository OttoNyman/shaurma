import {
  HttpErrorResponse,
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, share } from 'rxjs/operators';
import { ResponseStatus } from '../constants/ResponseStatus';

@Injectable()
export class ResponseErrorInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          return of(new HttpResponse({
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            url: response.url,
            body: { status: ResponseStatus.ERROR, errors: [{ code: 1, message: response.message }], data: null }
          }));
        }

        return of(response);
      })
    );
  }
}
