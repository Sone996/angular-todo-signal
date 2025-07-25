import { FormControl } from '@angular/forms';

export type TodoItem = {
  id: number;
  title: string;
  description: string;
  done: boolean;
};

export type TodoForm = {
  title: FormControl<string>;
  description: FormControl<string>;
  done: FormControl<boolean>;
};
