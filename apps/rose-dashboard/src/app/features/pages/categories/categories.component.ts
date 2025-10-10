import { CategoriesService, Category } from "@angular-monorepo/categories";
import { Component, inject, signal, WritableSignal } from "@angular/core";
import { DataViewComponent } from "../../../shared/ui/dataView/dataView.component";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";

@Component({
  selector: "app-categories",
  imports: [DataViewComponent],
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
})
export class CategoriesComponent {
  private category_service = inject(CategoriesService);
  private router = inject(Router);
  private messageService = inject(MessageService);
  table_header_records: string[] = ["name", "products"];
  cats: WritableSignal<Category[]> = signal<Category[]>([]);

  ngOnInit() {
    this.category_service.getAllCategories().subscribe({
      next: (res) => {
        this.cats.set(res.categories);
      },
    });
  }

   // Handling the events from DataViewComponent
  onAddNew() {
    this.router.navigate(['dashboard/categories/add']);
  }

  onEditCategory(category: Category) {
    this.router.navigate([`dashboard/categories/edit/${category._id}`]);
  }
    onDeleteCategory(category: Category) {
    this.category_service.deleteCategory(category._id).subscribe({
      next: () => {
        this.messageService.add({
          severity: "success",
          detail: "Category deleted successfully!",
          life: 3000,
        });
        this.loadCategories(); // Refresh the list
      },
      error: (err) => {
        console.error("Delete failed:", err);
        this.messageService.add({
          severity: "error",
          detail: "Failed to delete category. Please try again.",
          life: 5000,
        });
      },
    });
  }
    private loadCategories() {
    this.category_service.getAllCategories().subscribe({
      next: (res) => {
        this.cats.set(res.categories);
      },
    });
  }
}
