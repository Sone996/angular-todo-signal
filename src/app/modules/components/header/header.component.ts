import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { TodoService } from '@app/data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatButton],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly #todoService = inject(TodoService);

  addTodo() {
    this.#todoService.clearTodo();
  }
}
