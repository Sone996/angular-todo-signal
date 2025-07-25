import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todo',
    pathMatch: 'full',
  },
  {
    path: 'todo',
    loadComponent: () => import('./modules/todo-list/todo-list.component').then((c) => c.TodoListComponent),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
