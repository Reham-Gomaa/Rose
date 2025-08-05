import { Component, DestroyRef, inject, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
// Components
import { NavbarComponent } from "../navbar/navbar.component";
import { FooterComponent } from "../footer/footer.component";
import { CardItemComponent } from "@rose/shared_Components_ui/card-item/card-item.component";
import { CustomInputComponent } from "@rose/shared_Components_ui/custom-input/custom-input.component";
import { ButtonComponent } from "@rose/shared_Components_ui/button/button.component";
//Translation
import { TranslatePipe } from "@ngx-translate/core";
import { TranslationService } from "@rose/core_services/translation/translation.service";
// Interfaces
import { BestSeller, BestSellerRes } from "@rose/core_interfaces/best-seller.interface";
//Shared Services
import { BestSellerService } from "@rose/shared_services/best-seller/best-seller.service";
//PrimeNG
import { CarouselModule } from "primeng/carousel";
import { SkeletonModule } from "primeng/skeleton";







@Component({
  selector: "app-order-flow",
  imports: [CommonModule, RouterOutlet, 
           NavbarComponent, FooterComponent,CarouselModule, 
           SkeletonModule,CardItemComponent,TranslatePipe,
          CustomInputComponent,FormsModule, ButtonComponent],
  templateUrl: "./order-flow.component.html",
  styleUrl: "./order-flow.component.scss",
})
export class OrderFlowComponent {
  private readonly bestsellerService = inject(BestSellerService);
  translationService = inject(TranslationService);

  bestSellers = signal<BestSeller[]>([]);
  showSkeleton = signal(true);
  loading = signal(true);
  skeletonItems = signal(Array(1).fill(0));

  private destroyRef = inject(DestroyRef);

   responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '560px',
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