import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-related-products",
  imports: [CommonModule,TranslatePipe],
  templateUrl: "./related-products.component.html",
  styleUrl: "./related-products.component.scss",
})
export class RelatedProductsComponent {}
