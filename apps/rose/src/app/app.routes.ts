import { Route } from '@angular/router';
import { DashboardComponent } from './features/layouts/dashboard/dashboard.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard Home',
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        title: 'Home',
        loadComponent: () =>
          import('./features/pages/home/home.component').then(
            (c) => c.HomeComponent
          ),
      },
      {
        path: 'all-categories',
        title: 'Our Categories',
        loadComponent: () =>
          import('./features/pages/all-categories/all-categories.component').then(
            (c) => c.AllCategoriesComponent
          ),
      },
      {
        path: 'about',
        title: 'About-Us',
        loadComponent: () =>
          import('./features/pages/about/about.component').then(
            (c) => c.AboutComponent
          ),
      },
      {
        path: 'contact',
        title: 'Contact Us',
        loadComponent: () =>
          import('./features/pages/contact/contact.component').then(
            (c) => c.ContactComponent
          ),
      },
    ],
  },
  {
    path: '**',
    title: 'Not Found',
    loadComponent: () =>
      import('./features/pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];






