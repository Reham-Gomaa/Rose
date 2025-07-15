import { Component, inject, OnInit, signal, DestroyRef } from "@angular/core";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Animations
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
// Interfaces
import { BestSeller, BestSellerRes } from "@rose/core_interfaces/best-seller.interface";
// Shared_Components
import { CardItemComponent } from "@rose/shared_Components_ui/card-item/card-item.component";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
// Shared_Services
import { BestSellerService } from "@rose/shared_services/best-seller/best-seller.service";
//PrimeNg
import { CarouselModule } from "primeng/carousel";
import { ButtonModule } from "primeng/button";
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: "app-best-seller",
  imports: [
    CarouselModule,
    ButtonModule,
    CardItemComponent,
    ButtonComponent,
    SkeletonModule,
    TranslatePipe,
  ],
  templateUrl: "./bestSeller.component.html",
  styleUrls: ["./bestSeller.component.scss"],
  animations: [fadeTransition],
})
export class BestSellerComponent implements OnInit {
  private readonly bestsellerService = inject(BestSellerService);
  translationService = inject(TranslationService);

  bestSellers = signal<BestSeller[]>([]);
  showSkeleton = signal(true);
  loading = signal(true);
  skeletonItems = signal(Array(1).fill(0));

  private destroyRef = inject(DestroyRef);

  responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "768px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  ngOnInit(): void {
    this.loadBestSellers();
  }
  loadBestSellers(): void {
    this.loading.set(true);
    this.showSkeleton.set(true);

    this.bestsellerService
      .getBestSellers()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res: BestSellerRes) => {
          this.bestSellers.set(res.bestSeller || []);
          this.loading.set(false);
          this.showSkeleton.set(false);
        },
        error: (err) => {
          console.error(err);
          this.loading.set(false);
          this.showSkeleton.set(false);
        },
      });
  }
}
