import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../enviroment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly API_URL = environment.apiUrl + '/api/v1/users';
  protected http = inject(HttpClient);
  protected router = inject(Router);

  register(userData: { email: string; password: string }): Observable<any> {
    return this.http.post(this.API_URL, userData);
  }
}
