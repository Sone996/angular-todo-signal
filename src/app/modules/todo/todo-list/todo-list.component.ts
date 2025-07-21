import { Component, inject } from '@angular/core';
import { TodoService } from '../../../data';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent {
  readonly #todoService = inject(TodoService);

  readonly $todoList = toSignal(this.#todoService.getTodoList$(), { initialValue: [] });

  changeStatus(selectedId: number): void {
    const ova = this.$todoList().find(({ id }) => id === selectedId);
    this.#todoService.todoChangeStatus(ova);
  }
}
