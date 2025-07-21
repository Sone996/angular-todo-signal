import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';

import { TodoService } from '../../../data';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './todo-detail.component.html',
  styleUrl: './todo-detail.component.scss',
})
export class TodoDetailComponent {
  readonly #todoService = inject(TodoService);
  readonly #route = inject(ActivatedRoute);

  readonly $paramId = computed(() => +this.#route.snapshot.params['id']);
  readonly $todoItem = toSignal(this.#todoService.getTodoById$(this.$paramId()), { initialValue: null });
}
