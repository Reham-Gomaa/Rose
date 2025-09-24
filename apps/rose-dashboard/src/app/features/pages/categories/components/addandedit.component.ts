import { Component, OnInit, inject, signal, computed } from "@angular/core";
import { ActivatedRoute, Router, RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { finalize } from "rxjs";

import { Category, CategoryRequest, SingleCategoryRes,CategoriesService, API_BASE_URL_CATEGORIES  } from "@angular-monorepo/categories";

// Components
import { SharedCategoryOccasionFormComponent, FormData } from "apps/rose-dashboard/src/app/shared/buisness/category-occasion-form/category-occasion-form.component";


@Component({
  selector: "app-addandedit",
  standalone: true,
  imports: [CommonModule, RouterModule, SharedCategoryOccasionFormComponent],
  templateUrl: "./addandedit.component.html",
  styleUrls: ["./addandedit.component.scss"]
})
export class AddandeditComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private categoriesService = inject(CategoriesService);

  // Signals
  isLoading = signal<boolean>(false);
  isSubmitting = signal<boolean>(false);
  errorMessage = signal<string>('');
  categoryId = signal<string | null>(null);
  currentCategory = signal<Category | null>(null);
  isFormValid = signal<boolean>(false);

  // Computed properties
  isEditMode = computed(() => !!this.categoryId());
  pageTitle = computed(() => 
    this.isEditMode() ? 'Edit Category' : 'Add a New Category'
  );
  breadcrumbText = computed(() => 
    this.isEditMode() ? 'Edit Category' : 'Add Category'
  );
  submitButtonText = computed(() => 
    this.isEditMode() ? 'Update Category' : 'Add Category'
  );
  formData = computed<FormData | null>(() => {
    const category = this.currentCategory();
    return category ? {
      name: category.name,
      image: category.image
    } : null;
  });

  ngOnInit(): void {
    this.initializeComponent();
  }

  private initializeComponent(): void {
    // Get category ID from route params
    const id = this.route.snapshot.paramMap.get('id');
    this.categoryId.set(id);

    // If edit mode, load the category
    if (this.isEditMode()) {
      this.loadCategory();
    }
  }

  private loadCategory(): void {
    const id = this.categoryId();
    if (!id) return;

    this.isLoading.set(true);
    this.errorMessage.set('');

    this.categoriesService.getCategoryById(id)
      .pipe(finalize(() => this.isLoading.set(false)))
      .subscribe({
        next: (response: any) => {
          // Adjust this according to the actual structure of CategoryRes
          const category = response.category || (response.categories && response.categories[0]);
          this.currentCategory.set(category ?? null);
        },
        error: (error) => {
          this.errorMessage.set('Failed to load category. Please try again.');
          console.error('Error loading category:', error);
        }
      });
  }

  handleFormSubmit(formData: FormData): void {
    if (!this.isFormValid()) return;

    const categoryRequest: CategoryRequest = {
      name: formData.name,
      image: formData.image
    };

    this.isSubmitting.set(true);
    this.errorMessage.set('');

    const operation = this.isEditMode()
      ? this.categoriesService.updateCategory(this.categoryId()!, categoryRequest)
      : this.categoriesService.addCategory(categoryRequest);

    operation
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe({
        next: (response: SingleCategoryRes) => {
          const successMessage = this.isEditMode() 
            ? 'Category updated successfully!' 
            : 'Category added successfully!';
          
          // law ha3mel toastr
          console.log(successMessage, response);
          
          // Navigate back to categories list
          this.router.navigate(['/categories']);
        },
        error: (error) => {
          const errorMsg = this.isEditMode()
            ? 'Failed to update category. Please try again.'
            : 'Failed to add category. Please try again.';
          
          this.errorMessage.set(errorMsg);
          console.error('Error saving category:', error);
        }
      });
  }

  onFormValidityChange(isValid: boolean): void {
    this.isFormValid.set(isValid);
  }
}
