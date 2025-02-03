import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/users/user.service';
import { Token } from '../model/user/token.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // Correction de 'styleUrl' en 'styleUrls'
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]], // Correction de 'username' en 'email'
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe({
        next: (token: Token) => {
          console.log('Connexion réussie, token reçu :', token);
          this.userService.setToken(token);
          this.router.navigate(['/albums']);
        },
        error: (err) => {
          console.error('Erreur lors de la connexion :', err);
          alert('Échec de la connexion, vérifiez vos identifiants.');
        }
      });
    } else {
      console.log('Formulaire invalide');
      alert('Veuillez remplir tous les champs correctement.');
    }
  }
}
