import { firstValueFrom } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  resource,
  signal,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { SubscriptionService } from '../../../shared/subscription.service';
import { AuthService } from '../../../shared/auth.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent {
  private subscriptionService = inject(SubscriptionService);
  private authService = inject(AuthService);

  subs = input<any>([]);

  subscriptionResouce = resource({
    request: () => null,
    loader: async () => {
      const currentUser = this.authService.currentUser;
      const response = await firstValueFrom(
        this.subscriptionService.getSubscriptions(currentUser.id)
      );

      console.warn('subscriptions', response);
      return response;
    },
  });

  subscriptions = computed(() => {
    const statesValue = this.subscriptionResouce.value();

    if (Array.isArray(statesValue)) {
      return statesValue.map(({ id, name, price }) => ({
        id,
        name,
        price,
      }));
    }

    return [];
  });

  showModal = false;

  lineChartData = {
    labels: ['Jan', 'Fev', 'Mar', 'Abr'],
    datasets: [{ label: 'Gastos Mensais', data: [300, 500, 250, 400] }],
  };

  pieChartData = {
    labels: ['Streaming', 'Educação', 'Fitness'],
    datasets: [{ data: [40, 30, 30] }],
  };

  subscriptionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    startDate: new FormControl('', Validators.required),
  });

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.subscriptionForm.reset();
  }

  submit() {
    if (this.subscriptionForm.invalid) {
      this.subscriptionForm.markAllAsTouched();
      return;
    }

    const newSubscription = this.subscriptionForm.value;

    this.subscriptionService.createSubscription(newSubscription).subscribe({
      next: (response) => {
        console.log('Subscription created successfully:', response);
        this.subscriptionForm.reset();
      },
      error: (error) => {
        console.error('Error creating subscription:', error);
      },
    });
    // Aqui você pode enviar para o service/backend futuramente
    this.closeModal();
  }
}
