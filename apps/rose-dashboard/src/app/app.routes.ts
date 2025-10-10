import { Route } from "@angular/router";
import { DashboardComponent } from "@rose_dashboard/features_layouts/dashboard/dashboard.component";

export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    title: "titles.dashboard",
    children: [
      { path: "", redirectTo: "overview", pathMatch: "full" },
      {
        path: "overview",
        title: "titles.overview",
        loadComponent: () =>
          import("@rose_dashboard/features_pages/overview/overview.component").then(
            (c) => c.OverviewComponent,
          ),
      },
      {
        path: "categories",
        title: "titles.categories",
        children: [
          {
            path: "",
            loadComponent: () =>
              import("@rose_dashboard/features_pages/categories/categories.component").then(
                (c) => c.CategoriesComponent,
              ),
          },
          {
            path: "add",
            title: "titles.add-category",
            loadComponent: () =>
              import(
                "@rose_dashboard/features_pages/categories/components/addandedit.component"
              ).then((c) => c.AddEditCategoryComponent),
          },
          {
            path: "edit/:id",
            title: "titles.edit-category",
            loadComponent: () =>
              import(
                "@rose_dashboard/features_pages/categories/components/addandedit.component"
              ).then((c) => c.AddEditCategoryComponent),
          },
        ],
      },

      {
        path: "occasions",
        title: "titles.occasions",
        children: [
          {
            path: "",
            loadComponent: () =>
              import("@rose_dashboard/features_pages/occasions/occasions.component").then(
                (c) => c.OccasionsComponent,
              ),
          },
          {
            path: "add",
            title: "titles.add-occasion",
            loadComponent: () =>
              import(
                "@rose_dashboard/features_pages/occasions/components/AddandEditOccasions.component"
              ).then((c) => c.AddEditOccasionComponent),
          },
          {
            path: "edit/:id",
            title: "titles.edit-occasion",
            loadComponent: () =>
              import(
                "@rose_dashboard/features_pages/occasions/components/AddandEditOccasions.component"
              ).then((c) => c.AddEditOccasionComponent),
          },
        ],
      },
      {
        path: "products",
        title: "titles.products",
        children: [
          {
            path: "",
            loadComponent: () =>
              import("@rose_dashboard/features_pages/products/products.component").then(
                (c) => c.ProductsComponent,
              ),
          },
          {
            path: "add",
            title: "titles.add-category",
            loadComponent: () =>
              import(
                "@rose_dashboard/features_pages/products/components/products-form/products-form.component"
              ).then((c) => c.ProductsFormComponent),
          },
          {
            path: "edit/:id",
            title: "titles.edit-category",
            loadComponent: () =>
              import(
                "@rose_dashboard/features_pages/products/components/products-form/products-form.component"
              ).then((c) => c.ProductsFormComponent),
          },
        ],
      },

      {
        path: "user-profile",
        loadComponent: () =>
          import("@rose_dashboard/features_pages/user-profile/user-profile.component").then(
            (c) => c.UserProfileComponent,
          ),
        title: "titles.user-profile",
      },
      {
        path: "error",
        loadComponent: () =>
          import("@rose_dashboard/features_pages/error/error.component").then(
            (c) => c.ErrorComponent,
          ),
        title: "titles.error",
      },
      {
        path: "**",
        title: "titles.not-found",
        loadComponent: () =>
          import("@rose_dashboard/features_pages/not-found/not-found.component").then(
            (c) => c.NotFoundComponent,
          ),
      },
    ],
  },
  {
    path: "authorization",
    loadComponent: () =>
      import("@rose_dashboard/features_layouts/authorization/authorization.component").then(
        (c) => c.AuthorizationComponent,
      ),
    title: "titles.authorization",
  },
];
