import { Component, inject, OnInit, signal } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesService } from "@angular-monorepo/categories";
import { SingleCategoryRes, CategoryRequest } from "@angular-monorepo/categories";
import { CategoryOccasionFormComponent } from "apps/rose-dashboard/src/app/shared/buisness/category-occasion-form/category-occasion-form.component";
import { MessageService } from "primeng/api";
import { Skeleton } from "primeng/skeleton";
import { Subject, takeUntil } from "rxjs";
import { TranslateService, TranslateModule } from "@ngx-translate/core";

@Component({
  selector: "app-add-edit-category",
  standalone: true,
  imports: [CategoryOccasionFormComponent, Skeleton, TranslateModule],
  templateUrl: "./addandedit.component.html",
  styleUrls: ["./addandedit.component.scss"],
})
export class AddEditCategoryComponent implements OnInit {
  private _messageService = inject(MessageService);
  private _translate = inject(TranslateService);
  isEditMode = false;
  categoryId: string | null = null;
  initialData: any = null;
  isLoading = signal(true);
  private destroy$ = new Subject<void>();

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get("id");
    this.isEditMode = !!this.categoryId;

    if (this.isEditMode && this.categoryId) {
      this.categoriesService
        .getCategoryById(this.categoryId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (res: SingleCategoryRes) => {
            this.initialData = {
              name: res.category.name,
              image: res.category.image,
            };
            this.isLoading.set(false);
          },
          error: (err) => {
            console.error("Failed to load category:", err);
            this.isLoading.set(false);
          },
        });
    } else {
      this.isLoading.set(false);
    }
  }

  handleFormSubmit(formData: FormData): void {
    if (this.isEditMode && this.categoryId) {
      this.categoriesService.updateCategory(this.categoryId, formData).subscribe({
        next: () => {
          this._messageService.add({
            severity: "success",
            summary: this._translate.instant("common.success"),
            detail: this._translate.instant("category.addEdit.messages.updateSuccess"),
            life: 3000,
          });
          this.router.navigate(["/dashboard/categories"]);
        },
        error: (err) => {
          console.error("Update failed:", err);
          this._messageService.add({
            severity: "error",
            summary: this._translate.instant("common.error"),
            detail: this._translate.instant("category.addEdit.messages.updateError"),
            life: 5000,
          });
        },
      });
    } else {
      this.categoriesService.addCategory(formData).subscribe({
        next: () => {
          this._messageService.add({
            severity: "success",
            summary: this._translate.instant("common.success"),
            detail: this._translate.instant("category.addEdit.messages.addSuccess"),
            life: 3000,
          });
          this.router.navigate(["/dashboard/categories"]);
        },
        error: (err) => {
          console.error("Add failed:", err);
          console.error("Error details:", err.error);
          this._messageService.add({
            severity: "error",
            summary: this._translate.instant("common.error"),
            detail: this._translate.instant("category.addEdit.messages.addError"),
            life: 5000,
          });
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
