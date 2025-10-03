import {
  Component,
  effect,
  input,
  InputSignal,
  signal,
  ViewEncapsulation,
  WritableSignal,
} from "@angular/core";
import { TranslatePipe } from "@ngx-translate/core";
// Shared_Interfaces
import { Category } from "@rose_dashboard/core_interfaces/statistics";
// Primeng
import { RatingModule } from "primeng/rating";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { Skeleton } from "primeng/skeleton";

@Component({
  selector: "app-categories-reports",
  imports: [TableModule, TagModule, RatingModule, TranslatePipe, Skeleton],
  templateUrl: "./categoriesReports.component.html",
  styleUrl: "./categoriesReports.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesReportsComponent {
  categories: InputSignal<Category[]> = input([] as Category[]);
  loading: WritableSignal<boolean> = signal(true);

  constructor() {
    effect(() => {
      const data = this.categories();
      this.loading.set(!data || data.length === 0);
    });
  }
}
