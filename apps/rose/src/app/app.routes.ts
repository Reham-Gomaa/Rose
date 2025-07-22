import { Route } from "@angular/router";

import { DetailsComponent } from "./features/pages/details/details.component";

import { DashboardComponent } from "@rose/features_layouts/dashboard/dashboard.component";
import path from "path";

export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    title: "Dashboard Home",
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        title: "Home",
        loadComponent: () =>
          import("@rose/features_pages/home/home.component").then((c) => c.HomeComponent),
      },
      {
        path: "all-categories",
        title: "Our Categories",
        loadComponent: () =>
          import("@rose/features_pages/all-categories/all-categories.component").then(
            (c) => c.AllCategoriesComponent
          ),
      },
      {
        path: "about",
        title: "About-Us",
        loadComponent: () =>
          import("@rose/features_pages/about/about.component").then((c) => c.AboutComponent),
      },
      {
        path: "contact",
        title: "Contact-Us",
        loadComponent: () =>
          import("@rose/features_pages/contact/contact.component").then((c) => c.ContactComponent),
      },

      {
        path: "details/:id",
        title: "Product Details",
        loadComponent: () =>
          import("@rose/features_pages/details/details.component").then((c) => c.DetailsComponent),
      },
    ],
  },
  {
    path: "login",
    title: "Log-in",
    loadComponent: () =>
      import("@rose/features_layouts/authentication/components/login/login.component").then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: "register",
    title: "Register",
    loadComponent: () =>
      import("@rose/features_layouts/authentication/components/register/register.component").then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: "reset-password",
    title: "Forget Password",
    loadComponent: () =>
      import(
        "@rose/features_layouts/authentication/components/reset-password/reset-password.component"
      ).then((c) => c.ResetPasswordComponent),
  },
  {
    path: "**",
    title: "Not Found",
    loadComponent: () =>
      import("@rose/features_pages/not-found/not-found.component").then((c) => c.NotFoundComponent),
  },
];
