import { Component, computed, effect, inject, input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { TodoForm, TodoItem, TodoService } from '@app/data';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatCheckboxModule],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
})
export class TodoFormComponent {
  readonly #todoService = inject(TodoService);
  readonly selectedTodo = input<TodoItem | null>(null);

  readonly pageTitle = computed(() => (this.selectedTodo() ? 'Edit Todo' : 'Add Todo'));
  readonly buttonText = computed(() => (this.selectedTodo() ? 'Edit' : 'Add'));

  readonly todoForm: FormGroup<TodoForm> = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    done: new FormControl(false, { nonNullable: true }),
  });

  constructor() {
    effect(() => {
      this.todoForm.controls.title.setValue(this.selectedTodo()?.title ?? '');
      this.todoForm.controls.description.setValue(this.selectedTodo()?.description ?? '');
      this.todoForm.controls.done.setValue(this.selectedTodo()?.done ?? false);
    });
  }

  submitRequest() {
    this.#todoService.submitTodo(this.todoForm.getRawValue(), this.selectedTodo()?.id);
  }
}
