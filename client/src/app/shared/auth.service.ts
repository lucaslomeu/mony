import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../enviroment';
import { BehaviorSubject } from 'rxjs';

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

  private userSubject = new BehaviorSubject<any>(null);

  public user$ = this.userSubject.asObservable();

  setUser(user: any): void {
    this.userSubject.next(user);
    localStorage.setItem('authToken', user.token);
  }

  // Método para limpar os dados (logout)
  clearUser(): void {
    this.userSubject.next(null);
    localStorage.removeItem('authData');
  }

  login(credentials: { email: string; password: string }) {
    return this.http.post<AuthResponse>(`${this.API_URL}/login`, credentials);
  }

  get currentUser(): any | null {
    return this.userSubject.value;
  }

  loadStoredUser(): void {
    const storedUser = localStorage.getItem('authData');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  isAuthenticated(): boolean {
    const token = this.getAuthToken();
    return !!token;
  }
}
