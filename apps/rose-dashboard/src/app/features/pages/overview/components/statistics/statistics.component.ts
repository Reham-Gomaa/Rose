import {
  AfterViewInit,
  Component,
  effect,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from "@angular/core";
// Interfaces
import { Overall } from "apps/rose-dashboard/src/app/core/interfaces/statistics";
// Pipes
import { DecimalPipe } from "@angular/common";
import { TranslatePipe } from "@ngx-translate/core";
// PrimeNg
import { Skeleton } from "primeng/skeleton";
// Shared_Component
import { EmptyStateComponent } from "../empty-state/emptyState.component";

interface StatCardConfig {
  key: keyof Overall;
  label: string;
  icon: string;
  bg: string;
  color: string;
}

@Component({
  selector: "app-statistics",
  imports: [TranslatePipe, Skeleton, DecimalPipe, EmptyStateComponent],
  templateUrl: "./statistics.component.html",
  styleUrl: "./statistics.component.scss",
})
export class StatisticsComponent {
  overall: InputSignal<Overall | undefined> = input<Overall>();
  loading: WritableSignal<boolean> = signal(true);
  hasData: WritableSignal<boolean> = signal(false);
  empty: WritableSignal<boolean> = signal(true);

  constructor() {
    effect(() => {
      const data = this.overall();

      if (data === undefined) {
        this.loading.set(true);
        this.hasData.set(false);
        this.empty.set(false);
      } else if (Object.keys(data).length === 0) {
        this.loading.set(false);
        this.hasData.set(false);
        this.empty.set(true);
      } else {
        this.loading.set(false);
        this.hasData.set(true);
        this.empty.set(false);
      }
    });
  }

  statCards: StatCardConfig[] = [
    {
      key: "totalProducts",
      label: "overview.statistics.products",
      icon: "pi pi-box",
      bg: "var(--overall-pdt-bg)",
      color: "var(--overall-pdt-color)",
    },
    {
      key: "totalOrders",
      label: "overview.statistics.orders",
      icon: "pi pi-receipt",
      bg: "var(--overall-orders-bg)",
      color: "var(--overall-orders-color)",
    },
    {
      key: "totalCategories",
      label: "overview.statistics.categories",
      icon: "pi pi-clipboard",
      bg: "var(--overall-category-bg)",
      color: "var(--overall-category-color)",
    },
    {
      key: "totalRevenue",
      label: "overview.statistics.revenue",
      icon: "pi pi-dollar",
      bg: "var(--overall-revenue-bg)",
      color: "var(--overall-revenue-color)",
    },
  ];
}
