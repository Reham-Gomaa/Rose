import { Component, inject, OnInit, signal, DestroyRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

import { TranslatePipe } from "@ngx-translate/core";

import { CategoriesService } from "../../../../../shared/services/categories/categories.service";
import { CategoryRes, Category } from "../../../../../core/interfaces/categories.interface";

// PrimeNG
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { Skeleton } from "primeng/skeleton";

@Component({
  selector: "app-categories",
  imports: [CommonModule, ToastModule, Skeleton, TranslatePipe],
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
  providers: [MessageService],
})
export class CategoriesComponent implements OnInit {
  private categoriesService = inject(CategoriesService);
  private messageService = inject(MessageService);

  private destroyRef = inject(DestroyRef);

  categories = signal<Category[]>([]);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  ngOnInit(): void {
    this.loadCategories();
  }

  private loadCategories() {
    this.isLoading.set(true);


      this.categoriesService.getAllCategories().pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
        next: (response: CategoryRes) => {
          this.categories.set(response.categories || []);
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
          this.messageService.add({
            severity: "error",
            summary: "Error",
            detail: "Failed to load categories",
          });
        },
      })

  }
}
