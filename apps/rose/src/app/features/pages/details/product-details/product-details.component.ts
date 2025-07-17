// @angular
import { NgOptimizedImage } from "@angular/common";
import { Component, input, InputSignal } from "@angular/core";

// shared-interface
import { Product } from "@rose/core_interfaces/carditem.interface";

@Component({
  selector: "app-product-details",
  imports: [NgOptimizedImage],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent {

  productDetails:InputSignal<Product> = input.required<Product>();


}
