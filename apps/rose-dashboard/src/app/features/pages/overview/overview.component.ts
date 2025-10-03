import { Component, DestroyRef, inject, OnInit, signal, WritableSignal } from "@angular/core";
// RxJs
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Shared_Services
import { TranslationService } from "@angular-monorepo/services";
import { StatisticsService } from "@rose_dashboard/shared_services/overview/statistics/statistics.service";
// Shared_Comp
import { CategoriesReportsComponent } from "./components/categories/categoriesReports.component";
import { LowStockProductsComponent } from "./components/lowStock/lowStockProducts.component";
import { OrderChartComponent } from "./components/orderChart/order-chart.component";
import { RevenueChartComponent } from "./components/revenueChart/revenue-chart.component";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { TopSellingProductsComponent } from "./components/topSelling/topSellingProducts.component";

import {
  Category,
  DailyRevenue,
  LowStockProduct,
  MonthlyRevenue,
  OrdersByStatu,
  Overall,
  TopSellingProduct,
} from "@rose_dashboard/core_interfaces/statistics";

@Component({
  selector: "app-overview",
  imports: [
    StatisticsComponent,
    CategoriesReportsComponent,
    TopSellingProductsComponent,
    LowStockProductsComponent,
    OrderChartComponent,
    RevenueChartComponent,
  ],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.scss",
})
export class OverviewComponent implements OnInit {
  private readonly translationService = inject(TranslationService);
  private readonly statisticsService = inject(StatisticsService);
  private readonly destroyRef = inject(DestroyRef);

  overallReports: WritableSignal<Overall> = signal({} as Overall);
  categories: WritableSignal<Category[]> = signal([] as Category[]);
  orderByStatus: WritableSignal<OrdersByStatu[]> = signal([] as OrdersByStatu[]);
  dailyRevenue: WritableSignal<DailyRevenue[]> = signal([] as DailyRevenue[]);
  monthlyRevenue: WritableSignal<MonthlyRevenue[]> = signal([] as MonthlyRevenue[]);
  topSellingPdts: WritableSignal<TopSellingProduct[]> = signal([] as TopSellingProduct[]);
  lowStockPdts: WritableSignal<LowStockProduct[]> = signal([] as LowStockProduct[]);

  ngOnInit(): void {
    this.getAllStatistics();
  }

  getAllStatistics() {
    this.statisticsService
      .getAllStatistics()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.overallReports.set(res.statistics.overall);
          this.categories.set(res.statistics.categories.filter((item) => item.totalProducts > 0));
          this.orderByStatus.set(res.statistics.orders.ordersByStatus);
          this.dailyRevenue.set(res.statistics.orders.dailyRevenue);
          this.monthlyRevenue.set(res.statistics.orders.monthlyRevenue);
          this.topSellingPdts.set(res.statistics.products.topSellingProducts);
          this.lowStockPdts.set(res.statistics.products.lowStockProducts);
        },
      });
  }
}
