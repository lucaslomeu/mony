import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../enviroment';
import { tap } from 'rxjs';

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl + '/auth';
  protected http = inject(HttpClient);
  protected router = inject(Router);

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem('authToken', response.token);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }
}
