import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'D:/WAD Ass/3a/my-auth-app/src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <h2>Login</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
          </div>
          <div class="form-group">
            <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
          </div>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a routerLink="/signup">Sign Up</a></p>
      </div>
    </div>
  `
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.authService.login(this.email, this.password)) {
      this.router.navigate(['/home']);
    } else {
      alert('Invalid credentials!');
    }
  }
}