import { Product, ProductsService } from "@angular-monorepo/products";
import { Component, inject, signal, WritableSignal } from "@angular/core";

@Component({
  selector: "app-products-form",
  imports: [],
  templateUrl: "./products-form.component.html",
  styleUrl: "./products-form.component.scss",
})
export class ProductsFormComponent {
  private products_service = inject(ProductsService);
  table_header_records: string[] = ["name", "price", "stock", "sales", "ratings"];
  prods: WritableSignal<Product[]> = signal<Product[]>([]);

  ngOnInit() {
    this.products_service.getAllProducts().subscribe({
      next: (res) => {
        this.prods.set(res.products);
        console.log(this.prods());
      },
    });
  }
}
