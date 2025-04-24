import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, tap } from 'rxjs';
import { AuthResponse, AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly API_URL = environment.apiUrl + '/users';
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private currentUserSubject = new BehaviorSubject<AuthResponse | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  getCurrentUser(): Observable<AuthResponse | null> {
    return this.http.get<AuthResponse>(`${this.API_URL}/user`).pipe(
      tap((user) => this.currentUserSubject.next(user)),
      catchError(() => {
        this.authService.logout();
        return of(null);
      })
    );
  }

  loadUserOnAppStart(): Promise<void> {
    return new Promise((resolve) => {
      this.getCurrentUser().subscribe(() => resolve());
    });
  }

  getCurrentUserSnapshot(): AuthResponse | null {
    return this.currentUserSubject.value;
  }
}
