import { DataViewComponent } from "../../../shared/ui/dataView/dataView.component";
import { Product, ProductsService } from "@angular-monorepo/products";
import { Component, inject, signal, WritableSignal } from "@angular/core";

// import { Component } from "@angular/core";

@Component({
  selector: "app-products",
  imports: [DataViewComponent],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent {
  private products_service = inject(ProductsService);
  table_header_records: string[] = ["name", "price", "stock", "sales", "ratings"];
  prods: WritableSignal<Product[]> = signal<Product[]>([]);

  ngOnInit() {
    this.products_service.getAllProducts().subscribe({
      next: (res) => {
        this.prods.set(res.products);
      },
    });
  }
}
