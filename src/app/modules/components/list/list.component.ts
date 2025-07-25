import { Component, inject, input } from '@angular/core';
import { TodoItem, TodoService } from '@app/data';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [MatButton],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  readonly #todoService = inject(TodoService);
  readonly todoList = input<TodoItem[]>([]);

  setItemForEdit(id: number) {
    this.#todoService.getTodo(id);
  }
}
