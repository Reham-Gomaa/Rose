import { Route } from '@angular/router';
import { DashboardComponent } from './features/layouts/dashboard/dashboard.component';

export const appRoutes: Route[] = [
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
