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

  updateSubscription(subscription: Subscription): Promise<Subscription> {
    console.warn('updateSubscription', subscription);
    return firstValueFrom(
      this.http.put<Subscription>(
        `${this.API_URL}/${subscription.id}`,
        subscription
      )
    );
  }

  getSubscriptions(): Promise<Subscription[]> {
    return firstValueFrom(
      this.http.get<Subscription[]>(`${this.API_URL}/user/subscriptions`)
    );
  }

  deleteSubscription(subscription: Subscription): Promise<void> {
    return firstValueFrom(
      this.http.delete<void>(`${this.API_URL}/${subscription.id}`)
    );
  }
}
