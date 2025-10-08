import { Component, inject, OnInit, signal, DestroyRef } from "@angular/core";
// Images
import { NgOptimizedImage } from "@angular/common";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";
// Translation
import { TranslatePipe, TranslateService } from "@ngx-translate/core";
import { TranslationService } from "@angular-monorepo/services";
// Animations
import { fadeTransition } from "@angular-monorepo/services";
// Shared_Services , Interfaces
import { CategoriesService, Category, CategoryRes } from "@angular-monorepo/categories";
// Shared_Components
import { NoDataAvailableComponent } from "@rose/shared_Components_business/no-data-available/no-data-available.component";
// PrimeNG
import { ToastModule } from "primeng/toast";
import { MessageService } from "primeng/api";
import { Skeleton } from "primeng/skeleton";

@Component({
  selector: "app-categories",
  imports: [ToastModule, Skeleton, TranslatePipe, NoDataAvailableComponent, NgOptimizedImage],
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
  animations: [fadeTransition],
})
export class CategoriesComponent implements OnInit {
  private readonly _translate = inject(TranslateService);
  private categoriesService = inject(CategoriesService);
  translationService = inject(TranslationService);
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

    this.categoriesService
      .getAllCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response: CategoryRes) => {
          this.categories.set(response.categories || []);
          this.isLoading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.isLoading.set(false);
          this.messageService.add({
            severity: "error",
            detail: this._translate.instant("messagesToast.failedToLoadCategories"),
          });
        },
      });
  }
}
