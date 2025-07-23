import { ChangeDetectionStrategy, Component, computed, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';
import { TodoServiceV2 } from '@app/data/todo-v2';

@Component({
  selector: 'app-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormField, MatInputModule, MatLabel],
  templateUrl: './todo-form.component-v2.html',
  styleUrl: './todo-form.component-v2.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoFormComponent implements OnInit, OnDestroy {
  readonly #todoService = inject(TodoServiceV2);
  readonly #route = inject(ActivatedRoute);

  readonly paramId = computed(() => +this.#route.snapshot.params['id']);
  readonly selectedTodo = this.#todoService.selectedTodo;

  readonly $formTitle = computed(() => (this.paramId() ? 'Edit Todo V2' : 'Create Todo V2'));
  readonly $buttonText = computed(() => (this.paramId() ? 'Edit' : 'Create'));

  form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: Validators.required }),
    description: new FormControl('', { nonNullable: true, validators: Validators.required }),
  });

  constructor() {
    effect(() => {
      this.form.controls.title.setValue(this.selectedTodo()?.title ?? '');
      this.form.controls.description.setValue(this.selectedTodo()?.description ?? '');
    });
  }

  ngOnInit(): void {
    if (this.paramId()) {
      this.#todoService.getTodo(this.paramId());
    }
  }

  ngOnDestroy(): void {
    this.#todoService.resetSelectedTodo();
  }

  submitRequest() {
    this.#todoService.submitTodo(this.form.getRawValue(), this.paramId());
  }
}
