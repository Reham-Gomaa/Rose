import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RelatedProductsComponent } from "./components/related-products/related-products.component";

@Component({
  selector: "app-details",
  imports: [CommonModule, RelatedProductsComponent],
  templateUrl: "./details.component.html",
  styleUrl: "./details.component.scss",
})
export class DetailsComponent {}
