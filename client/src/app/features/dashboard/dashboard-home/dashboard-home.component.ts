import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, resource } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { SubscriptionService } from '../../../shared/subscription.service';
import { ChartData } from 'chart.js';

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
      const statesMap = statesValue.map(({ id, name, price, startDate }) => ({
        id,
        name,
        price,
        startDate,
      }));

      this.createCharts(statesMap);

      console.warn('Updated subscriptions:', statesMap);
      return statesMap;
    }

    return [];
  });

  showModal = false;

  lineChartData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Gastos Mensais',
        data: [],
        fill: true,
        borderColor: '#4bc0c0',
        tension: 0.1,
      },
    ],
  };

  pieChartData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Categorias de Assinaturas',
        data: [],
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
      },
    ],
  };

  subscriptionForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    startDate: new FormControl('', Validators.required),
  });

  totalSubscriptions = computed(() => {
    const statesValue = this.subscriptionResource.value();

    if (Array.isArray(statesValue)) {
      return statesValue.length;
    }

    return 0;
  });

  totalPrice = computed(() => {
    const statesValue = this.subscriptionResource.value();

    if (Array.isArray(statesValue)) {
      return statesValue.reduce((acc, curr) => acc + curr.price, 0);
    }

    return 0;
  });

  totalPriceFormatted = computed(() => {
    const statesValue = this.subscriptionResource.value();

    if (Array.isArray(statesValue)) {
      const value = statesValue.reduce((acc, curr) => acc + curr.price, 0);

      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value);
    }

    return 0;
  });

  mediaPrice = computed(() => {
    const statesValue = this.subscriptionResource.value();

    if (Array.isArray(statesValue)) {
      const value = statesValue.reduce((acc, curr) => acc + curr.price, 0);

      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(value / statesValue.length);
    }

    return 0;
  });

  createCharts(statesMap: any[]) {
    console.warn('statesMap', statesMap);

    const data = statesMap.reduce((acc, curr) => {
      const date = new Date(curr.startDate);
      const month = date
        .toLocaleString('pt-BR', { month: 'long' })
        .replace(/^./, (char) => char.toUpperCase());

      if (!acc[month]) {
        acc[month] = 0;
      }

      acc[month] += curr.price;

      return acc;
    }, {});

    this.lineChartData.labels = Object.keys(data);
    this.lineChartData.datasets[0].data = Object.values(data);
    this.lineChartData.datasets[0].backgroundColor = '#4bc0c0';

    this.pieChartData.labels = Object.keys(data);
    this.pieChartData.datasets[0].data = Object.values(data);
    this.pieChartData.datasets[0].backgroundColor = [
      '#ff6384',
      '#36a2eb',
      '#ffce56',
    ];
  }

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
