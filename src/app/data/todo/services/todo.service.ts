import { inject, Injectable } from '@angular/core';
import { TodoItem, todoList } from '..';
import { map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  protected readonly _router = inject(Router);

  getTodoList$(): Observable<TodoItem[]> {
    return of(todoList);
  }

  todoChangeStatus(item: TodoItem | undefined): void {
    if (!item) return;
    const todo = todoList.find(({ id }) => id === item.id);
    if (todo) {
      todo.done = !todo.done;
    }
  }

  getTodoById$(selectedId: number): Observable<TodoItem> {
    return of(todoList).pipe(
      map((list) => list.find(({ id }) => id === selectedId)),
      switchMap((item) => (item ? of(item) : throwError(() => new Error('Todo item not found'))))
    );
  }

  submitTodo$(item: { title: string; description: string }, id: number | undefined): Observable<TodoItem[]> {
    const newItem = { ...item, id: id ? id : todoList.length, done: false };
    return id ? this._editTodo$(newItem) : this._createTodo$(newItem);
  }

  private _createTodo$(newItem: TodoItem): Observable<TodoItem[]> {
    todoList.unshift(newItem);
    console.log(newItem);
    this._router.navigate(['todo']);
    return of(todoList);
  }

  private _editTodo$(newItem: TodoItem): Observable<TodoItem[]> {
    const index = todoList.findIndex(({ id }) => id === newItem.id);
    if (index > -1) {
      todoList[index] = newItem;
    } else {
      console.warn(`Todo with id ${newItem.id} not found. Creating new one instead.`);
      todoList.unshift(newItem);
    }

    this._router.navigate(['todo']);
    return of(todoList);
  }
}
