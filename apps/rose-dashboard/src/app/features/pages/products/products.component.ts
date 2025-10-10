// import { DataViewComponent } from "../../../shared/ui/dataView/dataView.component";
// import { Product, ProductsService } from "@angular-monorepo/products";
// import { Component, inject, signal, WritableSignal } from "@angular/core";

// // import { Component } from "@angular/core";

// @Component({
//   selector: "app-products",
//   imports: [DataViewComponent],
//   templateUrl: "./products.component.html",
//   styleUrl: "./products.component.scss",
// })
// export class ProductsComponent {
//   private products_service = inject(ProductsService);
//   table_header_records: string[] = ["name", "price", "stock", "sales", "ratings"];
//   prods: WritableSignal<Product[]> = signal<Product[]>([]);

//   ngOnInit() {
//     this.products_service.getAllProducts().subscribe({
//       next: (res) => {
//         this.prods.set(res.products);
//       },
//     });
//   }
// }


import { DataViewComponent } from "../../../shared/ui/dataView/dataView.component";
import { Product, ProductsService } from "@angular-monorepo/products";
import { Component, inject, signal, WritableSignal } from "@angular/core";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

// import { Component } from "@angular/core";

@Component({
  selector: "app-products",
  imports: [DataViewComponent],
  templateUrl: "./products.component.html",
  styleUrl: "./products.component.scss",
})
export class ProductsComponent {
  private products_service = inject(ProductsService);
   private router = inject(Router);
  private messageService = inject(MessageService); 

  table_header_records: string[] = ["name", "price", "stock", "sales", "ratings"];
  prods: WritableSignal<Product[]> = signal<Product[]>([]);

  ngOnInit() {
    this.products_service.getAllProducts().subscribe({
      next: (res) => {
         console.log('Products GET works:', res);
        this.prods.set(res.products);
      },
      error: (err) => {
      console.error('Products GET failed:', err); // If this fails too, it's URL/auth issue
    }
    });
  }

  onAddNew() {
    this.router.navigate(['dashboard/products/add']);
  }

  onEditProduct(product: Product) {
    this.router.navigate([`dashboard/products/edit/${product._id}`]);
  }

  onDeleteProduct(product: Product) {
    this.products_service.deleteProduct(product._id!).subscribe({
      next: () => {
        this.messageService.add({
          severity: "success",
          detail: "Product deleted successfully!",
          life: 3000,
        });
        this.loadProducts();
      },
      error: (err) => {
        console.error("Delete failed:", err);
        this.messageService.add({
          severity: "error",
          detail: "Failed to delete product. Please try again.",
          life: 5000,
        });
      },
    });
  }

  private loadProducts() {
    this.products_service.getAllProducts().subscribe({
      next: (res) => {
        this.prods.set(res.products);
      },
    });
  }
}

