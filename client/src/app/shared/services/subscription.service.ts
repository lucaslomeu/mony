import { firstValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../enviroment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from '../interfaces/subscription';

@Injectable({
  providedIn: 'root',
})
export class SubscriptionService {
  private readonly API_URL = environment.apiUrl + '/subscription';
  protected http = inject(HttpClient);
  protected router = inject(Router);

  createSubscription(subscriptionData: Subscription): Promise<Subscription> {
    return firstValueFrom(
      this.http.post<Subscription>(`${this.API_URL}`, subscriptionData)
    );
  }

  getSubscriptions(): Promise<Subscription[]> {
    return firstValueFrom(
      this.http.get<Subscription[]>(`${this.API_URL}/user/subscriptions`)
    );
  }
}
