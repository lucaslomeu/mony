import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit, resource } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubscriptionService } from '../../../shared/services/subscription.service';
import { ChartData } from 'chart.js';
import { ChartComponent } from '../components/chart/chart.component';
import { UserService } from '../../../shared/services/user.service';
import { Subscription } from '../../../shared/interfaces/subscription';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, ChartComponent],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent {
  private subscriptionService = inject(SubscriptionService);
  private userService = inject(UserService);

  subscriptionResource = resource({
    request: () => null,
    loader: async () => {
      return await this.subscriptionService.getSubscriptions();
    },
  });

  subscriptions = computed(() => {
    const statesValue = this.subscriptionResource.value();
    console.warn('statesValu1111e', statesValue);
    if (statesValue) {
      this.createCharts(statesValue);
      return statesValue;
    }

    return [];
  });

  showModal = false;

  lineChartData: ChartData = {
    labels: [],
    datasets: [
      {
        label: 'Gasto Mensal',
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
    id: new FormControl(),
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(0.01)]),
    startDate: new FormControl('', Validators.required),
    categories: new FormControl<string[]>([], Validators.required),
  });

  totalSubscriptions = computed(() => {
    return this.subscriptionResource.value()?.length || 0;
  });

  totalPrice = computed(() => {
    const statesValue = this.subscriptionResource.value();

    return statesValue?.reduce((acc, curr) => acc + curr.price, 0) || 0;
  });

  totalPriceFormatted = computed(() => {
    const value =
      this.subscriptionResource
        .value()
        ?.reduce((acc, curr) => acc + curr.price, 0) || 0;

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  });

  mediaPrice = computed(() => {
    const statesValue = this.subscriptionResource.value();

    const value = statesValue?.reduce((acc, curr) => acc + curr.price, 0) || 0;

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value / (statesValue?.length || 1));
  });

  user$ = this.userService.currentUser$;

  userCategories: any[] = [];
  filteredCategories: any[] = [
    {
      id: 1,
      name: 'Categoria 1',
    },
    {
      id: 2,
      name: 'Categoria 2',
    },
    {
      id: 3,
      name: 'Categoria 3',
    },
    {
      id: 4,
      name: 'Categoria 4',
    },
    {
      id: 5,
      name: 'Categoria 5',
    },
  ];

  newCategory: string = '';
  selectedCategories: string[] = [];

  addCategory() {
    if (
      this.newCategory.trim() &&
      !this.selectedCategories.includes(this.newCategory.trim())
    ) {
      this.selectedCategories.push(this.newCategory.trim());
      this.subscriptionForm
        .get('categories')
        ?.setValue(this.selectedCategories);
    }
    this.newCategory = '';
  }

  removeCategory(category: string) {
    this.selectedCategories = this.selectedCategories.filter(
      (cat) => cat !== category
    );
    this.subscriptionForm.get('categories')?.setValue(this.selectedCategories);
  }

  createCharts(statesMap: any[]) {
    interface MonthlyData {
      [month: string]: number;
    }

    console.warn('sstatesMap', statesMap);

    const data: MonthlyData = statesMap
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )
      .reduce((acc: MonthlyData, curr) => {
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

    const categoriesData = statesMap.reduce((acc, curr) => {
      const category = curr.categoryName || 'Outros';
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += curr.price;
      return acc;
    }, {});

    this.lineChartData.labels = Object.keys(data);
    this.lineChartData.datasets[0].data = Object.values(data);
    this.lineChartData.datasets[0].backgroundColor = '#4bc0c0';

    console.warn('data', data);

    this.pieChartData.labels = Object.keys(categoriesData);
    this.pieChartData.datasets[0].data = Object.values(categoriesData);
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

  onCategoryInput(value: any) {
    this.filteredCategories = this.userCategories.filter((cat) =>
      cat.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  formatCurrency(event: Event) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters
    value = (parseInt(value, 10) / 100).toFixed(2); // Convert to currency format
    input.value = `R$ ${value.replace('.', ',')}`; // Format as "R$"
    this.subscriptionForm.get('price')?.setValue(value); // Update form control
  }

  async submit() {
    // if (this.subscriptionForm.invalid) {
    //   console.warn('Formulário inválido');
    //   this.subscriptionForm.markAllAsTouched();
    //   return;
    // }

    const newSubscription = {
      id: this.subscriptionForm.value.id || null,
      name: this.subscriptionForm.value.name || '',
      description: this.subscriptionForm.value.description || '',
      price: parseFloat(this.subscriptionForm.value.price || '0'),
      startDate: this.subscriptionForm.value.startDate || '',
      categories:
        this.subscriptionForm.value.categories || this.selectedCategories,
      userId: undefined,
    };

    console.warn('newSubscription', newSubscription);

    if (newSubscription.id) {
      await this.subscriptionService
        .updateSubscription(newSubscription)
        .then(() => {
          this.subscriptionResource.reload();
          this.createCharts(this.subscriptionResource.value() || []);
          this.subscriptionForm.reset();
        });
    } else {
      await this.subscriptionService.createSubscription(newSubscription);
    }

    this.closeModal();
  }

  editSubscription(subscription: Subscription) {
    console.warn('subscription', subscription);
    this.subscriptionForm.patchValue({
      id: subscription.id,
      name: subscription.name,
      description: subscription.description,
      price: subscription.price.toFixed(2),
      startDate: subscription.startDate,
      categories: subscription.categories,
    });

    this.selectedCategories = subscription.categories;

    this.showModal = true;
  }

  removeSubscription(subscription: Subscription) {
    this.subscriptionService.deleteSubscription(subscription).then(() => {
      this.subscriptionResource.reload();
      this.createCharts(this.subscriptionResource.value() || []);
    });
  }
}
