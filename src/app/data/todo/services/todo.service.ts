import { computed, Injectable, signal } from '@angular/core';
import { TodoItem } from '../models';
import { delay, map, of, switchMap, throwError } from 'rxjs';
import { todoList } from '..';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  protected readonly _todos = signal<TodoItem[]>([]);
  protected readonly _todoItem = signal<TodoItem | null>(null);

  readonly todoList = computed(() => this._todos());
  readonly selectedTodo = computed(() => this._todoItem());

  getTodoList() {
    if (this._todos().length) {
      return;
    }

    return of(todoList)
      .pipe(
        delay(300),
        map((list) => list)
      )
      .subscribe((list) => {
        return this._todos.set([...list]);
      });
  }

  getTodo(selectedId: number) {
    of(this._todos().length ? this._todos() : todoList)
      .pipe(
        delay(300),
        map((list) => list.find(({ id }) => id === selectedId)),
        switchMap((item) => (item ? of(item) : throwError(() => new Error('Item not found'))))
      )
      .subscribe((item) => this._todoItem.set(item));
  }

  clearTodo() {
    this._todoItem.set(null);
  }

  submitTodo(item: Omit<TodoItem, 'id'>, selectedId: number | undefined) {
    const fullItem = { ...item, id: selectedId ? selectedId : this.todoList().length + 1 };
    if (selectedId) {
      this.editTodo(fullItem);
    } else {
      this.createTodo(fullItem);
    }
  }

  private createTodo(newItem: TodoItem) {
    of(newItem)
      .pipe(delay(300))
      .subscribe((item) => {
        this._todoItem.set(item);
        this._todos.set([item, ...this.todoList()]);
      });
  }

  private editTodo(newItem: TodoItem) {
    of(newItem)
      .pipe(delay(300))
      .subscribe((todo) => {
        const updated = this.todoList().map((item) => (item.id === todo.id ? todo : item));
        this._todos.set(updated);
        this._todoItem.set(todo);
        this.clearTodo();
      });
  }
}
