import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CategoriesService } from "@angular-monorepo/categories";
import { SingleCategoryRes, CategoryRequest } from "@angular-monorepo/categories";
import { CategoryOccasionFormComponent } from "apps/rose-dashboard/src/app/shared/buisness/category-occasion-form/category-occasion-form.component";

@Component({
  selector: "app-add-edit-category",
  standalone: true,
  imports: [CategoryOccasionFormComponent], // import your form here
   templateUrl: "./addandedit.component.html",
   styleUrls: ["./addandedit.component.scss"]
})
export class AddEditCategoryComponent implements OnInit {
  isEditMode = false;
  categoryId: string | null = null;
  initialData: any = null; // to prefill when editing

  constructor(
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get("id");
    this.isEditMode = !!this.categoryId;

    if (this.isEditMode && this.categoryId) {
      this.categoriesService.getCategoryById(this.categoryId).subscribe({
        next: (res: SingleCategoryRes) => {
          this.initialData = {
            name: res.category.name,
            image: res.category.image, // careful, here backend returns URL not File
          };
        },
      });
    }
  }

  handleFormSubmit(formData: FormData): void {
    if (this.isEditMode && this.categoryId) {
      // Update category
      this.categoriesService.updateCategory(this.categoryId, formData as any).subscribe({
        next: () => {
          alert("Category updated successfully!");
          this.router.navigate(["/categories"]);
        },
        error: (err) => console.error("Update failed:", err),
      });
    } else {
      // Add category
      this.categoriesService.addCategory(formData as any).subscribe({
        next: () => {
          alert("Category added successfully!");
          this.router.navigate(["/categories"]);
        },
        error: (err) => console.error("Add failed:", err),
      });
    }
  }
}
