// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { UserService } from '../app/service/users/user.service';// Ton service d'authentification
import { Router } from '@angular/router';
import { refreshToken } from '../app/model/user/refreshToken.model';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le token d'accès et vérifier si l'utilisateur est connecté
    const authToken = this.userService.getToken()
    
    if (authToken) {
      // Ajouter le token dans les headers de la requête
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 && this.userService.getRefreshToken()) {
          // Si le token est expiré, essayer de rafraîchir le token avec le refresh token
          return this.userService.refreshToken().pipe(
            switchMap((newToken: refreshToken) => {
              // Si le rafraîchissement du token a réussi, relancer la requête initiale
              req = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${newToken}`
                }
              });
              return next.handle(req); // Relancer la requête initiale avec le nouveau token
            }),
            catchError(refreshError => {
              this.userService.clearLogin();
              this.router.navigate(['/login']);
              throw Error(refreshError);
            })
          );
        } else {
          return throwError(error);
        }
      })
    );
  }
}
