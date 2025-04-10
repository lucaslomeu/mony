import { CommonModule } from '@angular/common';
import { Component, computed, inject, resource } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { SubscriptionService } from '../../../shared/subscription.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent {
  private subscriptionService = inject(SubscriptionService);

  subscriptionResource = resource({
    request: () => null,
    loader: async () => {
      const response = await this.subscriptionService.getSubscriptions();

      return response;
    },
  });

  subscriptions = computed(() => {
    const statesValue = this.subscriptionResource.value();

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
        this.subscriptionForm.reset();

        this.subscriptionResource.update(() => {
          return [...this.subscriptions(), response];
        });
      },
      error: (error) => {
        console.error('Error creating subscription:', error);
      },
    });
    // Aqui você pode enviar para o service/backend futuramente
    this.closeModal();
  }
}
