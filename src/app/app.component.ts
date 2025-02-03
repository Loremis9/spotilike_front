import { Component } from '@angular/core';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(public authService: AuthService ){}
  title = 'front-api-spotilike';

  logout(){
    this.authService.logout()
  }

  isAuthenticate(){
    return this.authService.isAuthenticated()
  }
}
