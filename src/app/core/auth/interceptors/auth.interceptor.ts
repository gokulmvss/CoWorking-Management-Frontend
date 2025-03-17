// import { HttpInterceptorFn } from '@angular/common/http';

// export const authInterceptor: HttpInterceptorFn = (req, next) => {
//   return next(req);
// };

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Skip adding auth header for login and register endpoints
    if (request.url.includes('/api/auth/login') || 
        request.url.includes('/api/auth/register')) {
      return next.handle(request);
    }
    
    const authToken = this.authService.getAuthToken();
    
    if (authToken) {
      // Clone the request and add the authorization header
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Basic ${authToken}`
        }
      });
      
      // Handle the cloned request and catch potential auth errors
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Unauthorized - Token expired or invalid
            this.authService.logout();
            this.router.navigate(['/auth/login']);
          } else if (error.status === 403) {
            // Forbidden - User doesn't have required permissions
            this.router.navigate(['/']);
          }
          
          return throwError(() => error);
        })
      );
    }
    
    // If no token, just pass the original request
    return next.handle(request);
  }
}