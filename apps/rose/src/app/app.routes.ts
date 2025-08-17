import { Route } from "@angular/router";

import { DashboardComponent } from "@rose/features_layouts/dashboard/dashboard.component";
import { loggedGuard } from "./core/guards/logged-user/logged.guard";

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
      {
        path: "order-flow",
        loadComponent: () =>
          import("@rose/features_layouts/order-flow/order-flow.component").then(
            (c) => c.OrderFlowComponent
          ),
      },
      {
        path: "allorders",
        loadComponent: () =>
          import("@rose/features_pages/orders/orders.component").then((c) => c.OrdersComponent),
        title: "Your Orders",
      },
      {
        path: "user-profile",
        loadComponent: () =>
          import("@rose/features_layouts/user-profile/user-profile.component").then(
            (c) => c.UserProfileComponent
          ),
        title: "User Profile",
      },
    ],
  },
  {
    path: "login",
    title: "Log-in",
    canActivate: [loggedGuard],
    loadComponent: () =>
      import("@rose/features_layouts/authentication/components/login/login.component").then(
        (c) => c.LoginComponent
      ),
  },
  {
    path: "register",
    title: "Register",
    canActivate: [loggedGuard],
    loadComponent: () =>
      import("@rose/features_layouts/authentication/components/register/register.component").then(
        (c) => c.RegisterComponent
      ),
  },
  {
    path: "reset-password",
    title: "Forget Password",
    canActivate: [loggedGuard],
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
