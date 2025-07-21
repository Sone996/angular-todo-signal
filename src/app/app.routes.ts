import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    loadChildren: () => import('./modules/todo').then((m) => m.todoRoutes),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
