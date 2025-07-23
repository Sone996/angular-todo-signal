import { inject, Injectable, signal } from '@angular/core';
import { TodoItem } from '../models';
import { delay, map, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { todoList } from '../mocks';

@Injectable({
  providedIn: 'root',
})
export class TodoServiceV2 {
  protected readonly _router = inject(Router);

  protected readonly _todos = signal<TodoItem[]>([]);
  protected readonly _selectedTodo = signal<TodoItem | null>(null);

  get todos() {
    return this._todos.asReadonly();
  }

  get selectedTodo() {
    return this._selectedTodo.asReadonly();
  }

  getTodoList() {
    if (this._todos().length > 0) {
      return;
    }
    of(todoList)
      .pipe(delay(300))
      .subscribe((todos) => this._todos.set(todos));
  }

  toggleTodoStatus(id: number): void {
    of(id)
      .pipe(delay(300))
      .subscribe((todoId) => {
        this._todos.set(this.todos().map((todo) => (todoId === todo.id ? { ...todo, done: !todo.done } : todo)));
      });
  }

  getTodo(selectedId: number) {
    of(this.todos().length ? this.todos() : todoList)
      .pipe(
        delay(300),
        map((list) => list.find(({ id }) => id === selectedId)),
        switchMap((item) => (item ? of(item) : throwError(() => new Error('Todo item not found'))))
      )
      .subscribe((item) => this._selectedTodo.set(item));
  }

  submitTodo(item: { title: string; description: string }, id: number | undefined) {
    const newItem = { ...item, id: id ? id : this.todos().length + 1, done: false };
    id ? this._editTodo(newItem) : this._createTodo(newItem);
  }

  private _createTodo(newItem: TodoItem) {
    of(newItem)
      .pipe(delay(300))
      .subscribe((todo) => {
        this._todos.set([todo, ...this._todos()]);
        this._router.navigate(['todo-v2']);
      });
  }

  private _editTodo(newItem: TodoItem) {
    of(newItem)
      .pipe(delay(300))
      .subscribe((todo) => {
        const updated = this._todos().map((item) => (item.id === todo.id ? todo : item));
        this._todos.set(updated);
        this._router.navigate(['todo-v2']);
      });
  }

  resetSelectedTodo() {
    this._selectedTodo.set(null);
  }
}
