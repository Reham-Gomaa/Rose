import { CategoriesService, Category } from "@angular-monorepo/categories";
import { Component, inject, signal, WritableSignal } from "@angular/core";
import { DataViewComponent } from "../../../shared/ui/dataView/dataView.component";

@Component({
  selector: "app-categories",
  imports: [DataViewComponent],
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
})
export class CategoriesComponent {
  private category_service = inject(CategoriesService);
  table_header_records: string[] = ["name", "products"];
  cats: WritableSignal<Category[]> = signal<Category[]>([]);

  ngOnInit() {
    this.category_service.getAllCategories().subscribe({
      next: (res) => {
        this.cats.set(res.categories);
        console.log(res);
      },
    });
  }
}
