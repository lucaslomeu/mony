import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-chart',
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent {
  readonly title = input<string>();
  chartType = input<ChartType>('bar');
  readonly data = input<ChartData>({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        fill: true,
        borderColor: '',
        tension: 0.1,
      },
    ],
  });

  get chartOptions(): ChartConfiguration['options'] {
    const tipo = this.chartType();

    if (tipo === 'pie') {
      return {
        plugins: {
          legend: {
            display: true,
            position: 'right',
          },
          tooltip: {
            callbacks: {
              label: (context) => `${context.label}: R$ ${context.parsed}`,
            },
          },
        },
      };
    }

    if (tipo === 'line') {
      return {
        responsive: true,
        plugins: {
          legend: {
            display: true,
          },
          tooltip: {
            callbacks: {
              label: (context) => `R$ ${context.parsed.y.toFixed(2)}`,
            },
          },
        },
        elements: {
          line: {
            tension: 0.4,
          },
        },
      };
    }

    // Default (bar)
    return {
      responsive: true,
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          callbacks: {
            label: (context) => `R$ ${context.parsed.y.toFixed(2)}`,
          },
        },
      },
    };
  }
}
