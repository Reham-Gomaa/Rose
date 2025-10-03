import { isPlatformBrowser } from "@angular/common";
import {
  Component,
  effect,
  inject,
  input,
  InputSignal,
  PLATFORM_ID,
  signal,
  WritableSignal,
} from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
// Shared_Interfaces
import { OrdersByStatu } from "@rose_dashboard/core_interfaces/statistics";
// Primeng
import { ChartModule } from "primeng/chart";
import { Skeleton } from "primeng/skeleton";

@Component({
  selector: "app-order-chart",
  imports: [ChartModule, TranslatePipe, Skeleton],
  templateUrl: "./order-chart.component.html",
  styleUrl: "./order-chart.component.scss",
})
export class OrderChartComponent {
  private readonly platformId = inject(PLATFORM_ID);

  orderByStatus: InputSignal<OrdersByStatu[]> = input([] as OrdersByStatu[]);
  loading: WritableSignal<boolean> = signal(true);
  colorMap!: Record<string, string>;
  filtered!: OrdersByStatu[];
  myLabels!: string[];
  values!: number[];
  backgroundColors!: string[];
  total!: number;
  percentage!: number[];
  data: any;
  options: any;

  constructor() {
    this.colorMap = {
      canceled: "#DC2626",
      inProgress: "#2B7FFF",
      completed: "#00BC7D",
      pending: "#fba707",
    };
    effect(() => {
      const data = this.orderByStatus();
      this.loading.set(!data || data.length === 0);
    });
  }

  private readonly chartEffect = effect(() => {
    const orders = this.orderByStatus();
    if (orders && orders.length > 0) {
      this.setChartData();
      this.initChart();
    }
  });

  setChartData() {
    this.filtered = this.orderByStatus().filter((o) => o._id !== null);
    this.myLabels = this.filtered.map((o) => o._id ?? "unknown");
    this.values = this.filtered.map((o) => o.count);
    this.backgroundColors = this.filtered.map((o) => this.colorMap[o._id!] || "#6B7280");
    this.total = this.values.reduce((a: any, b: any) => a + b, 0);
    this.percentage = this.values.map((v) => (v / this.total) * 100);
  }

  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue("--main-text");

      this.data = {
        datasets: [
          {
            data: this.values,
            backgroundColor: this.backgroundColors,
            hoverBackgroundColor: this.backgroundColors,
          },
        ],
      };

      this.options = {
        plugins: {
          tooltip: {
            cornerRadius: 21,
            padding: 8,
            displayColors: false,
            callbacks: {
              label: (context: { dataIndex: number }) => {
                const percentage = this.percentage[context.dataIndex];
                return `${Math.round(percentage)}%`;
              },
            },
            titleFont: {
              size: 11,
              weight: "600",
              family: "var(--font-family-1)",
            },
            bodyFont: {
              size: 17,
              family: "var(--font-family-1)",
            },
          },
        },
      };
    }
  }
}
