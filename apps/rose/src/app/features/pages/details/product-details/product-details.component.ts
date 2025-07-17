import { Component, input, InputSignal } from "@angular/core";
import { CommonModule,NgOptimizedImage } from "@angular/common";
import { Product } from "../../../../core/interfaces/carditem.interface";

@Component({
  selector: "app-product-details",
  imports: [CommonModule,NgOptimizedImage],
  templateUrl: "./product-details.component.html",
  styleUrl: "./product-details.component.scss",
})
export class ProductDetailsComponent {

  productDetails:InputSignal<Product> = input.required<Product>();


}
