import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent, ListComponent, TodoFormComponent } from '../components';
import { TodoService } from '@app/data';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [HeaderComponent, ListComponent, TodoFormComponent],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  readonly #todoService = inject(TodoService);

  readonly todoList = this.#todoService.todoList;
  readonly selectedTodo = this.#todoService.selectedTodo;

  ngOnInit(): void {
    this.#todoService.getTodoList();
  }
}
