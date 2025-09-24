import { Component } from "@angular/core";
import { StatisticsComponent } from "./components/statistics/statistics.component";
import { CategoriesReportsComponent } from "./components/categories/categoriesReports.component";

@Component({
  selector: "app-overview",
  imports: [StatisticsComponent, CategoriesReportsComponent],
  templateUrl: "./overview.component.html",
  styleUrl: "./overview.component.scss",
})
export class OverviewComponent {}
