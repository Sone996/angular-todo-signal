import { Route } from '@angular/router';

export const todoRoutesV2: Route[] = [
  {
    path: '',
    loadComponent: () => import('./todo-list-v2').then((c) => c.TodoListComponent),
  },
  {
    path: 'create-v2',
    loadComponent: () => import('./todo-form-v2').then((c) => c.TodoFormComponent),
  },
  {
    path: ':id',
    children: [
      {
        path: '',
        loadComponent: () => import('./todo-detail-v2').then((c) => c.TodoDetailComponent),
      },
      {
        path: 'edit-v2',
        loadComponent: () => import('./todo-form-v2').then((c) => c.TodoFormComponent),
      },
    ],
  },
];
