import { Component, inject, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
//Interfaces
import { Product } from "@angular-monorepo/products";
//Components
import { ProductDetailsComponent } from "./components/product-details/product-details.component";
import { RelatedProductsComponent } from "./components/related-products/related-products.component";
import { ProductReviewComponent } from "./components/product-review/product-review.component";
//Shared Services
import { ProductsService } from "@angular-monorepo/products";

@Component({
  selector: "app-details",
  imports: [ProductReviewComponent, ProductDetailsComponent, RelatedProductsComponent],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
})
export class DetailsComponent implements OnInit, OnDestroy {
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _productService = inject(ProductsService);
  subscription: Subscription = new Subscription();
  productId!: string;
  productDetails: Product = {} as Product;

  getProductId() {
    this._activatedRoute.params.subscribe({
      next: (params) => {
        setTimeout(() => {
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 0);

        this.productId = params["id"];
        this.getProductDetails();
      },
    });
  }

  getProductDetails() {
    this.subscription = this._productService.getProductDetails(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.product;
      },
    });
  }

  ngOnInit(): void {
    this.getProductId();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
