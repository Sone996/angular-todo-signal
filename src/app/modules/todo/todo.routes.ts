import { Route } from '@angular/router';

export const todoRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('./todo-list').then((c) => c.TodoListComponent),
  },
  {
    path: 'create',
    loadComponent: () => import('./todo-form').then((c) => c.TodoFormComponent),
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        loadComponent: () => import('./todo-detail').then((c) => c.TodoDetailComponent),
      },
      {
        path: 'edit',
        loadComponent: () => import('./todo-form').then((c) => c.TodoFormComponent),
      },
    ],
  },
];
