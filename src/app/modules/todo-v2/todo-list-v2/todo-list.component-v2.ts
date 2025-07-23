import { Component, computed, inject, OnInit } from '@angular/core';
import { TodoService } from '../../../data';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TodoServiceV2 } from '@app/data/todo-v2';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [MatButtonModule, RouterModule],
  templateUrl: './todo-list.component-v2.html',
  styleUrl: './todo-list.component-v2.scss',
})
export class TodoListComponent implements OnInit {
  readonly #todoService = inject(TodoServiceV2);

  readonly todoList = this.#todoService.todos;

  ngOnInit(): void {
    this.#todoService.getTodoList();
  }

  toggleStatus(selectedId: number): void {
    this.#todoService.toggleTodoStatus(selectedId);
  }
}
