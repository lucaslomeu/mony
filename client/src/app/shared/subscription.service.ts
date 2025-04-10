import { firstValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../enviroment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private readonly API_URL = environment.apiUrl + '/subscription';
  protected http = inject(HttpClient);
  protected router = inject(Router);

  createSubscription(subscriptionData: any) {
    return this.http.post(`${this.API_URL}`, subscriptionData);
  }

  getSubscriptions(): Promise<any> {
    return firstValueFrom(
      this.http.get<any>(`${this.API_URL}/user/subscriptions`)
    );
  }
}
