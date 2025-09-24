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
    title: "dashboard",
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
        loadComponent: () =>
          import("@rose_dashboard/features_pages/categories/categories.component").then(
            (c) => c.CategoriesComponent,
          ),
      },
      {
        path: "occasions",
        title: "titles.occasions",
        loadComponent: () =>
          import("@rose_dashboard/features_pages/occasions/occasions.component").then(
            (c) => c.OccasionsComponent,
          ),
      },
      {
        path: "products",
        title: "titles.products",
        loadComponent: () =>
          import("@rose_dashboard/features_pages/products/products.component").then(
            (c) => c.ProductsComponent,
          ),
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
    title: "titles.not-authorization",
  },
];
