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
            (c) => c.AllCategoriesComponent
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

      }
]
      },
      {
        path: "order-flow",
        loadComponent: () =>
          import("@rose/features_layouts/order-flow/order-flow.component").then(
            (c) => c.OrderFlowComponent
          ),
        children: [
          {
            path: "cart",
            loadComponent: () =>
              import("@rose/features_layouts/order-flow/components/cart/cart.component").then(
                (c) => c.CartComponent
              ),
            title: "titles.cart",
          },
            {
        path:'checkout',
        title:'Checkout',
        loadComponent:()=>import("../app/features/checkout/checkout.component").then(c=>c.CheckoutComponent)
  },
        ],
      },
      {
        path: "address",
        loadComponent: () =>
          import("@rose/features_pages/address/address.component").then((c) => c.AddressComponent),
        title: "titles.address",
      },
      {
        path: "allorders",
        loadComponent: () =>
          import("@rose/features_pages/orders/orders.component").then((c) => c.OrdersComponent),
        title: "titles.allorders",
      },
      {
        path: "user-profile",
        loadComponent: () =>
          import("@rose/features_layouts/user-profile/user-profile.component").then(
            (c) => c.UserProfileComponent
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
        (c) => c.LoginComponent
      ),
  },
  {
    path: "register",
    title: "titles.register",
    canActivate: [loggedGuard],
    loadComponent: () =>
      import("@rose/features_layouts/authentication/components/register/register.component").then(
        (c) => c.RegisterComponent
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
