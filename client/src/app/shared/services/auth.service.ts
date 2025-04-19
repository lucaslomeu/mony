import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../enviroment';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface AuthResponse {
  id: number;
  name: string;
  email: string;
  token: string;
  address: {
    cep: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: any;
    state: any;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = environment.apiUrl + '/auth';
  protected http = inject(HttpClient);
  protected router = inject(Router);
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(credentials: { email: string; password: string }) {
    return this.http
      .post<AuthResponse>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap((response) => {
          localStorage.setItem('authToken', response.token);
          this.currentUserSubject.next(response);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  getAuthToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  getCurrentUser(): Observable<AuthResponse | null> {
    return this.currentUser$;
  }
}
