import {
  Component,
  DestroyRef,
  inject,
  input,
  InputSignal,
  signal,
  WritableSignal,
} from "@angular/core";
// RxJs
// Interfaces
import { Overall } from "apps/rose-dashboard/src/app/core/interfaces/statistics";
// Services
import { TranslationService } from "@angular-monorepo/services";
import { TranslatePipe } from "@ngx-translate/core";
import { StatisticsService } from "apps/rose-dashboard/src/app/shared/services/overview/statistics/statistics.service";
// PrimeNg
import { Skeleton } from "primeng/skeleton";

interface StatCardConfig {
  key: keyof Overall;
  label: string;
  icon: string;
  bg: string;
  color: string;
}

@Component({
  selector: "app-statistics",
  imports: [TranslatePipe, Skeleton],
  templateUrl: "./statistics.component.html",
  styleUrl: "./statistics.component.scss",
})
export class StatisticsComponent {
  private readonly translationService = inject(TranslationService);

  //statistics: InputSignal<Overall | null> = input(null);
  loading: WritableSignal<boolean> = signal(true);

  statCards: StatCardConfig[] = [
    {
      key: "totalProducts",
      label: "statistics.products",
      icon: "pi pi-box",
      bg: "var(--overall-pdt-bg)",
      color: "var(--overall-pdt-color)",
    },
    {
      key: "totalOrders",
      label: "statistics.orders",
      icon: "pi pi-receipt",
      bg: "var(--overall-orders-bg)",
      color: "var(--overall-orders-color)",
    },
    {
      key: "totalCategories",
      label: "statistics.categories",
      icon: "pi pi-clipboard",
      bg: "var(--overall-category-bg)",
      color: "var(--overall-category-color)",
    },
    {
      key: "totalRevenue",
      label: "statistics.revenue",
      icon: "pi pi-dollar",
      bg: "var(--overall-revenue-bg)",
      color: "var(--overall-revenue-color)",
    },
  ];
}
