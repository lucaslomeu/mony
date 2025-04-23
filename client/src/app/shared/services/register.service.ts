import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../../environments/enviroment.prod';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private readonly API_URL = environment.apiUrl + '/users';
  protected http = inject(HttpClient);
  protected router = inject(Router);

  register(userData: {
    name: string;
    email: string;
    password: string;
    address: any;
  }): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, userData);
  }
}
