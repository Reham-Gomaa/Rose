import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// RxJs
import { map } from "rxjs";
// Interfaces
import { Overall } from "apps/rose-dashboard/src/app/core/interfaces/statistics";
// Services
import { TranslationService } from "@angular-monorepo/translation";
import { StatisticsService } from "apps/rose-dashboard/src/app/shared/services/overview/statistics/statistics.service";
import { TranslatePipe } from "@ngx-translate/core";
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
export class StatisticsComponent implements OnInit {
  private readonly translationService = inject(TranslationService);
  private readonly statisticsService = inject(StatisticsService);
  private readonly destroyRef = inject(DestroyRef);

  statistics: WritableSignal<Overall | null> = signal(null);
  loading: WritableSignal<boolean> = signal(true);

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics() {
    this.statisticsService
      .getAllStatistics()
      .pipe(
        map((res) => {
          return res.statistics.overall;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: (res) => {
          this.statistics?.set(res);
          this.loading.set(false);
        },
      });
  }

  statCards: StatCardConfig[] = [
    {
      key: "totalProducts",
      label: "statistics.products",
      icon: "pi pi-box",
      bg: "#fbeaea",
      color: "#a6252a",
    },
    {
      key: "totalOrders",
      label: "statistics.orders",
      icon: "pi pi-receipt",
      bg: "#0063d00d",
      color: "#155dfc",
    },
    {
      key: "totalCategories",
      label: "statistics.categories",
      icon: "pi pi-clipboard",
      bg: "#753cbf0d",
      color: "#753cbf",
    },
    {
      key: "totalRevenue",
      label: "statistics.revenue",
      icon: "pi pi-dollar",
      bg: "#0089610d",
      color: "#009966",
    },
  ];
}
