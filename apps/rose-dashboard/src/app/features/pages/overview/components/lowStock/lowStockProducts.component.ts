import {
  AfterViewInit,
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
import { LowStockProduct } from "@rose_dashboard/core_interfaces/statistics";
// Primeng
import { RatingModule } from "primeng/rating";
import { TableModule } from "primeng/table";
import { TagModule } from "primeng/tag";
import { Skeleton } from "primeng/skeleton";

@Component({
  selector: "app-low-stock-products",
  imports: [TableModule, TagModule, RatingModule, TranslatePipe, Skeleton],
  templateUrl: "./lowStockProducts.component.html",
  styleUrl: "./lowStockProducts.component.scss",
  encapsulation: ViewEncapsulation.None,
})
export class LowStockProductsComponent {
  lowStockProducts: InputSignal<LowStockProduct[]> = input([] as LowStockProduct[]);
  loading: WritableSignal<boolean> = signal(true);

  constructor() {
    effect(() => {
      const data = this.lowStockProducts();
      this.loading.set(!data || data.length === 0);
    });
  }
}
