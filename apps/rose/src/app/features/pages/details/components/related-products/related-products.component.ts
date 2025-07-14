import { Component, inject, Input, OnDestroy, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslatePipe } from "@ngx-translate/core";
import { ProductDetail, ProductDetailsRes } from "@rose/core_interfaces/details.interface"; 
import { Product, ProductRes } from "@rose/core_interfaces/carditem.interface"; 
import { CardItemComponent } from "@rose/shared_Components_ui/card-item/card-item.component";
import { CarouselModule } from "primeng/carousel";
import { SkeletonModule } from "primeng/skeleton";
import { ProductsService } from "@rose/shared_services/products/products.service";
import { HttpErrorResponse } from "@angular/common/http";
import { ActivatedRoute } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { fadeTransition } from "@rose/core_services/translation/fade.animation";
import { TranslationService } from "@rose/core_services/translation/translation.service";
import { Subscription } from 'rxjs';

@Component({
  selector: "app-related-products",
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    CardItemComponent,
    CarouselModule,
    SkeletonModule,
  ],
  templateUrl: "./related-products.component.html",
  styleUrls: ["./related-products.component.scss"],
  animations: [
    trigger("listAnimation", [
      transition("* => *", [
        query(
          ":enter",
          [
            style({ opacity: 0, transform: "translateY(20px)" }),
            stagger(100, [
              animate("300ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    [fadeTransition],
  ],
})
export class RelatedProductsComponent implements OnInit, OnDestroy {
  @Input() currentProductId!: string;

  relatedProducts: Product[] = []; 
  currentProduct!: ProductDetail; 
  loading: boolean = true;
  errorMessage: string | null = null;
  
  private subscriptions = new Subscription(); 

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

  private readonly productsService = inject(ProductsService);
  private readonly route = inject(ActivatedRoute);
  translationService = inject(TranslationService);

  ngOnInit(): void {
    this.loadProductData();
  }

  private loadProductData(): void {
    this.subscriptions.add(
      this.route.params.subscribe({
        next: params => {
          const productId = params['id'];
          if (productId) {
            this.currentProductId = productId;
            this.loadProductDetails();
          } else {
            this.handleError('No product ID provided');
          }
        },
        error: err => this.handleError('Failed to load route parameters', err)
      })
    );
  }

  private loadProductDetails(): void {
    this.loading = true;
    this.errorMessage = null;

    this.subscriptions.add(
      this.productsService.getSpecificProduct(this.currentProductId).subscribe({
        next: (res: ProductDetailsRes) => { 
          this.currentProduct = res.product;
          this.loadRelatedProducts(res.product.category);
        },
        error: (err: HttpErrorResponse) => {
          this.handleError('Failed to load product details', err);
        }
      })
    );
  }

  private loadRelatedProducts(categoryId: string): void {
    this.subscriptions.add(
      this.productsService.getAllProducts(categoryId).subscribe({
        next: (response: ProductRes) => { 
          // Filter out the current product from the results
          this.relatedProducts = response.products.filter(
            product => product._id !== this.currentProduct._id
          );
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          this.handleError('Failed to load related products', err);
        }
      })
    );
  }

  private handleError(message: string, error?: any): void {
    console.error(message, error);
    this.errorMessage = message;
    this.loading = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); 
  }

  showSkeleton(): boolean {
    return this.loading;
  }

  skeletonItems(): number[] {
    return Array(3).fill(0);
  }
}