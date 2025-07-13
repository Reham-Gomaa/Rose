import { Component, inject, Input, OnInit } from "@angular/core";
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
export class RelatedProductsComponent implements OnInit {
  @Input() currentProductId!: string;

  products: Product[] = [];
  currentProduct!: ProductDetail; 
  loading: boolean = true;
  errorMessage: string | null = null;
  

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
    this.route.params.subscribe(params => {
      const productId = params['id'];
      if (productId) {
        this.currentProductId = productId;
        this.fetchProducts();
      } else {
        console.error('No product ID provided');
        this.errorMessage = 'No product ID provided';
        this.loading = false;
      }
    });
  }

  fetchProducts(): void {
    this.loading = true;
    this.errorMessage = null;

    this.productsService.getSpecificProduct(this.currentProductId).subscribe({
      next: (res: ProductDetailsRes) => { 
        console.log(res);
        this.currentProduct = res.product;
        this.fetchRelatedProducts();
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load product details', err);
        this.errorMessage = 'Failed to load product details';
        this.loading = false;
      }
    });
  }

   fetchRelatedProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (response: ProductRes) => { 
        console.log('Products response:', response); 
        this.products = response.products;
        this.loading = false;
      },
      error: (err: HttpErrorResponse) => {
        console.error('Failed to load related products', err);
        this.errorMessage = 'Failed to load related products';
        this.loading = false;
      }
    });
  }

  relatedProducts(): Product[] {
    if (!this.products || !this.currentProduct) return [];
    return this.products.filter(
      product =>
        product.category === this.currentProduct.category &&
        product._id !== this.currentProduct._id
    );
  }

  showSkeleton(): boolean {
    return this.loading;
  }

  skeletonItems(): number[] {
    return Array(3).fill(0);
  }
}
