import { Component, inject } from "@angular/core";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
// import { CategoryAddEditComponent } from "./components/addandedit.component";
import { CategoriesService, Category,CategoryRes } from "@angular-monorepo/categories";
import { CategoryOccasionFormComponent } from "../../../shared/buisness/category-occasion-form/category-occasion-form.component";

@Component({
  selector: "app-categories",
  imports: [RouterLink, RouterLinkActive,CategoriesComponent,CategoryOccasionFormComponent],
  standalone: true,
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
})
export class CategoriesComponent {

 categories: { id: string; name: string }[] = [];

  private categoriesService = inject(CategoriesService);
  private router = inject(Router);

  ngOnInit(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res: CategoryRes) => {
        this.categories = res.categories.map(c => ({
          id: c._id,
          name: c.name,
        }));
      },
      error: (err) => console.error("Failed to load categories", err),
    });
  }

  //  Add button
  onAddCategory(): void {
    this.router.navigate(["dashboard/categories/add"]);
  }

  // Edit button
  onEditCategory(id: string): void {
    this.router.navigate([`dashboard/categories/edit/${id}`]);
  }
}
