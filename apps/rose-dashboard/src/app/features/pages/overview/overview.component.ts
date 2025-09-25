import { Component, DestroyRef, inject, OnInit } from "@angular/core";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { CategoriesReportsComponent } from "./components/categories/categoriesReports.component";
import { TableComponent } from "./components/table/table.component";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { map } from "rxjs";
import { StatisticsService } from "@rose_dashboard/shared_services/overview/statistics/statistics.service";

@Component({
  selector: "app-overview",
  imports: [StatisticsComponent, CategoriesReportsComponent, TableComponent],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.scss",
})
export class OverviewComponent implements OnInit {
  private readonly statisticsService = inject(StatisticsService);
  private readonly destroyRef = inject(DestroyRef);

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
          //this.statistics?.set(res);
          //this.loading.set(false);
        },
      });
  }
}
