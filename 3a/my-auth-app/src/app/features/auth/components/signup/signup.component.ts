import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'D:/WAD Ass/3a/my-auth-app/src/app/core/services/auth.service';
//D:\WAD Ass\3a\my-auth-app\src\app\core\services\auth.service.ts
@Component({
  selector: 'app-signup',
  template: `
    <div class="auth-container">
      <div class="auth-box">
        <h2>Sign Up</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <input type="email" [(ngModel)]="email" name="email" placeholder="Email" required>
          </div>
          <div class="form-group">
            <input type="password" [(ngModel)]="password" name="password" placeholder="Password" required>
          </div>
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a routerLink="/login">Login</a></p>
      </div>
    </div>
  `
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.authService.signup(this.email, this.password)) {
      this.router.navigate(['/login']);
    } else {
      alert('Email already exists!');
    }
  }
}
