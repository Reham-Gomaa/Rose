import {
  Component,
  Input,
  OnInit,
  signal,
  inject,
  DestroyRef,
  InputSignal,
  input,
  ViewEncapsulation,
} from "@angular/core";
import { CarouselModule } from "primeng/carousel";
import { SkeletonModule } from "primeng/skeleton";
import { CardItemComponent } from "../card-item/card-item.component";
import { BestSeller, BestSellerRes } from "@rose/core_interfaces/best-seller.interface";
import { BestSellerService } from "@rose/shared_services/best-seller/best-seller.service";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

@Component({
  selector: "app-bestseller-slider",
  imports: [CarouselModule, SkeletonModule, CardItemComponent],
  templateUrl: "./bestseller-slider.component.html",
  styleUrls: ["./bestseller-slider.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BestsellerSliderComponent implements OnInit {
  private readonly bestsellerService = inject(BestSellerService);
  private destroyRef = inject(DestroyRef);

  numVisible: InputSignal<number> = input(4);
  numScroll: InputSignal<number> = input(1);
  responsiveOptions: InputSignal<any[]> = input([] as any[]);
  ariaLabel: InputSignal<string> = input("Best seller products carousel");
  skeletonCount: InputSignal<number> = input(4);

  items = signal<BestSeller[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.loadBestSellers();
  }

  private loadBestSellers(): void {
    this.loading.set(true);
    this.bestsellerService
      .getBestSellers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: BestSellerRes) => {
          this.items.set(res.bestSeller || []);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.loading.set(false);
        },
      });
  }

  showSkeleton(): boolean {
    return this.loading();
  }

  skeletonItems(): any[] {
    return Array(this.skeletonCount()).fill(null);
  }
}
