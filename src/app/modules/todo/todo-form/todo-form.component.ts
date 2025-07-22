import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TodoItem, TodoService } from '../../../data';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInputModule, MatLabel],
  templateUrl: './todo-form.component.html',
  styleUrl: './todo-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent implements OnInit {
  readonly #todoService = inject(TodoService);
  readonly #route = inject(ActivatedRoute);

  readonly $paramId = computed(() => +this.#route.snapshot.params['id']);

  readonly $formTitle = computed(() => (this.$paramId() ? 'Edit Todo' : 'Create Todo'));
  readonly $buttonText = computed(() => (this.$paramId() ? 'Edit' : 'Create'));

  form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  ngOnInit(): void {
    if (!this.$paramId()) {
      return;
    }

    this.#todoService
      .getTodoById$(this.$paramId())
      .pipe(
        tap((item) => {
          this.form.controls.title.setValue(item.title);
          this.form.controls.description.setValue(item.description);
        })
      )
      .subscribe();
  }

  submitRequest$(): Observable<TodoItem[]> {
    return this.#todoService.submitTodo$(this.form.getRawValue(), this.$paramId());
  }
}
