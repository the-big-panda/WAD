// auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router) {}

  signup(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find((user: any) => user.email === email);
    
    if (userExists) {
      return false;
    }

    users.push({ email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  }

  login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify({ email }));
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }
}