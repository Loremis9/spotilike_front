import { Injectable } from '@angular/core';
import {  Observable,BehaviorSubject, tap, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Login} from '../../model/login.model';
import { sigIn } from '../../model/user/signin.model';
import { Token } from '../../model/user/token.model';
import { refreshToken } from '../../model/user/refreshToken.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  private loginSubject = new BehaviorSubject<Login | null>(null);

  // Observables pour écouter les changements

  public login$: Observable<Login | null> = this.loginSubject.asObservable();
  private productUrl = 'http://localhost:8000';

    login(login: Login
    ): Observable<Token> {
      return this.http.post<Token>(`${this.productUrl}/api/login`,login).pipe(
        tap((result: any)=>{
          const tk : Token = {
            acces_token:result['access_token']
            ,refresh_token:result['refresh_token']
          }
          this.setToken(tk);
          this.authService.login()
        })
      )
    }

    refreshToken(): Observable<refreshToken> {
      const refreshToken = this.getRefreshToken();
      if (refreshToken) {
        return this.http.post<refreshToken>(`${this.productUrl}/api/refresh`, refreshToken).pipe(
          catchError(error => {
            // Si le rafraîchissement échoue, gérer l'erreur
            throw Error(error);
          })
        );
      }
       throw Error('Refresh token not available');
    }

    getRefreshToken(): Observable<Token> {
      const currentToken = localStorage.getItem('refresh_token');
    if (!currentToken || !currentToken) {
      throw new Error('Aucun refresh_token disponible.');
    }
      return this.http.post<Token>(`${this.productUrl}/api/refresh`,
        { refresh_token: currentToken,});
    }

    sigIn(signin: sigIn): Observable<sigIn> {
      return this.http.post<sigIn>(`${this.productUrl}/api/signin`,signin);
    }

    setToken(token: Token): void {
      localStorage.setItem('token',token.acces_token!);
      localStorage.setItem('resfresh_token',token.refresh_token!);
    }
  
    getToken(): string | null  {
      return localStorage.getItem('token');
    }
  
    setLogin(login: Login): void {
      this.loginSubject.next(login);
    }
  
    getLogin(): Login | null {
      return this.loginSubject.value;
    }
  
    clearLogin(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('resfresh_token');
      this.authService.logout()
    }
}
