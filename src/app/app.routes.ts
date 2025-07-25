import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/home').then((m) => m.HomeComponent),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
