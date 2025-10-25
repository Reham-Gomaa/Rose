import { Route } from "@angular/router";
// Documentation
import { DocumentationComponent } from "./documentation/documentation.component";
// Components
import { DashboardComponent } from "@rose/features_layouts/dashboard/dashboard.component";
// Guards
import { loggedGuard } from "@angular-monorepo/core";
import { authGuard } from "@angular-monorepo/core";

export const appRoutes: Route[] = [
  {
    path: "",
    redirectTo: "dashboard/home",
    pathMatch: "full",
  },
  {
    path: "documentation",
    title: "titles.documentation",
    component: DocumentationComponent,
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    title: "titles.dashboard",
    children: [
      { path: "", redirectTo: "home", pathMatch: "full" },
      {
        path: "home",
        title: "titles.home",
        loadComponent: () =>
          import("@rose/features_pages/home/home.component").then((c) => c.HomeComponent),
      },
      {
        path: "all-categories",
        title: "titles.all-categories",
        loadComponent: () =>
          import("@rose/features_pages/all-categories/all-categories.component").then(
            (c) => c.AllCategoriesComponent,
          ),
      },
      {
        path: "about",
        title: "titles.about",
        loadComponent: () =>
          import("@rose/features_pages/about/about.component").then((c) => c.AboutComponent),
      },
      {
        path: "contact",
        title: "titles.contact",
        loadComponent: () =>
          import("@rose/features_pages/contact/contact.component").then((c) => c.ContactComponent),
      },
      {
        path: "details/:id",
        title: "titles.details",
        loadComponent: () =>
          import("@rose/features_pages/details/details.component").then((c) => c.DetailsComponent),
      },
      {
        path: "order-flow",
        title: "titles.cart",
        canActivate: [authGuard],
        loadComponent: () =>
          import("@rose/features_layouts/order-flow/order-flow.component").then(
            (c) => c.OrderFlowComponent,
          ),
      },
      {
        path: "address",
        canActivate: [authGuard],
        loadComponent: () =>
          import("@rose/features_pages/address/address.component").then((c) => c.AddressComponent),
        title: "titles.address",
      },
      {
        path: "allOrders",
        canActivate: [authGuard],
        loadComponent: () =>
          import("@rose/features_pages/orders/orders.component").then((c) => c.OrdersComponent),
        title: "titles.allorders",
      },
      {
        path: "wishlist",
        canActivate: [authGuard],
        loadComponent: () =>
          import("@rose/features_pages/wishlist/wishlist.component").then(
            (c) => c.WishlistComponent,
          ),
        title: "titles.wishlist",
      },
      {
        path: "user-profile",
        canActivate: [authGuard],
        loadComponent: () =>
          import("@rose/features_layouts/user-profile/user-profile.component").then(
            (c) => c.UserProfileComponent,
          ),
        title: "titles.user-profile",
      },
    ],
  },
  {
    path: "login",
    title: "titles.login",
    canActivate: [loggedGuard],
    loadComponent: () =>
      import("@rose/features_layouts/authentication/components/login/login.component").then(
        (c) => c.LoginComponent,
      ),
  },
  {
    path: "register",
    title: "titles.register",
    canActivate: [loggedGuard],
    loadComponent: () =>
      import("@rose/features_layouts/authentication/components/register/register.component").then(
        (c) => c.RegisterComponent,
      ),
  },
  {
    path: "reset-password",
    title: "titles.reset-password",
    canActivate: [loggedGuard],
    loadComponent: () =>
      import(
        "@rose/features_layouts/authentication/components/reset-password/reset-password.component"
      ).then((c) => c.ResetPasswordComponent),
  },
  {
    path: "**",
    title: "titles.not-found",
    loadComponent: () =>
      import("@rose/features_pages/not-found/not-found.component").then((c) => c.NotFoundComponent),
  },
];
