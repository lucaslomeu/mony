import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../enviroment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl + '/auth';
  protected http = inject(HttpClient);
  protected router = inject(Router);

  login(credentials: { email: string; password: string }) {
    return this.http.post(`${this.API_URL}/login`, credentials);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token;
  }
}
