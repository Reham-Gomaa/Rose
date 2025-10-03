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
import { TopSellingProduct } from "@rose_dashboard/core_interfaces/statistics";
// Primeng
import { RatingModule } from "primeng/rating";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { Skeleton } from "primeng/skeleton";

@Component({
  selector: "app-top-selling-products",
  imports: [TableModule, TagModule, RatingModule, TranslatePipe, Skeleton],
  templateUrl: "./topSellingProducts.component.html",
  styleUrl: "./topSellingProducts.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class TopSellingProductsComponent {
  topSellingProducts: InputSignal<TopSellingProduct[]> = input([] as TopSellingProduct[]);
  loading: WritableSignal<boolean> = signal(true);

  constructor() {
    effect(() => {
      const data = this.topSellingProducts();
      this.loading.set(!data || data.length === 0);
    });
  }
}
