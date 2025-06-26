import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import {
  Chart,
  registerables
} from 'chart.js';
import { addDays, startOfMonth, endOfMonth, format } from 'date-fns';

Chart.register(...registerables);

@Component({
  selector: 'app-product-chart',
  templateUrl: './product-chart.component.html',
})
export class ProductChartComponent implements OnInit, AfterViewInit {

  @Input() monthlyData: any | undefined;
  // monthlyData = [
  //   { date: '2025-06-11T22:00:00.000Z', count: '1' },
  //   { date: '2025-06-13T22:00:00.000Z', count: '1' },
  //   { date: '2025-06-14T22:00:00.000Z', count: '5' }
  // ];

  labels: string[] = [];
  data: number[] = [];

  ngOnInit() {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    const dailyMap = new Map<string, number>();

    for (let d = start; d <= end; d = addDays(d, 1)) {
      const label = format(d, 'yyyy-MM-dd');
      dailyMap.set(label, 0);
    }

    this.monthlyData.forEach((entry: any) => {
      const dateStr = format(new Date(entry.date), 'yyyy-MM-dd');
      if (dailyMap.has(dateStr)) {
        dailyMap.set(dateStr, +entry.count);
      }
    });

    this.labels = Array.from(dailyMap.keys());
    this.data = Array.from(dailyMap.values());
  }

  ngAfterViewInit() {
    const ctx = document.getElementById('dailyProductChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Products per Day',
          data: this.data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.3,
          pointBackgroundColor: 'white',
          pointBorderColor: 'blue',
          pointRadius: 5,
          pointHoverRadius: 7,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Daily Product Creation (Current Month)'
          },
          legend: {
            display: true
          }
        },
        scales: {
          x: {
            grid: {
              display: false 
            },
            ticks: {
              maxRotation: 90,
              minRotation: 45,
              callback: function(val: string | number, index: number) {
                const label = (this as any).getLabelForValue(index);
                return label.split('-')[2]; // show just the day
              }
            }
          },
          y: {
            grid: {
              display: false 
            },
            beginAtZero: true
          }
        }
      }
    });
  }
}