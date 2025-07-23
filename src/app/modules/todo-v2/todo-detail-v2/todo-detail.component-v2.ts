import { Component, computed, effect, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { TodoServiceV2 } from '@app/data/todo-v2';

@Component({
  selector: 'app-todo-detail',
  standalone: true,
  imports: [MatListModule],
  templateUrl: './todo-detail.component-v2.html',
  styleUrl: './todo-detail.component-v2.scss',
})
export class TodoDetailComponent {
  readonly #todoService = inject(TodoServiceV2);
  readonly #route = inject(ActivatedRoute);

  readonly paramId = computed(() => +this.#route.snapshot.params['id']);
  readonly todoItem = this.#todoService.selectedTodo;

  ngOnInit(): void {
    if (this.paramId()) {
      this.#todoService.getTodo(this.paramId());
    }
  }

  ngOnDestroy(): void {
    this.#todoService.resetSelectedTodo();
  }
}
