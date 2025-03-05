import { Component, OnInit } from '@angular/core';
import { AuthService } from 'D:/WAD Ass/3a/my-auth-app/src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-container">
      <h1>Welcome, {{userEmail}}!</h1>
      <button (click)="logout()">Logout</button>
    </div>
  `
})
export class HomeComponent implements OnInit {
  userEmail: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    this.userEmail = user.email;
  }

  logout() {
    this.authService.logout();
  }
}