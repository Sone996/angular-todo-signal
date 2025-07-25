import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';

jest.mock('..', () => ({
  todoList: [
    { id: 1, title: 'Do dishes', completed: false },
    { id: 2, title: 'Learn RxJS', completed: true },
  ],
}));

describe('TodoService (trimmed)', () => {
  let service: TodoService;

  beforeEach(() => {
    jest.useFakeTimers();
    TestBed.configureTestingModule({
      providers: [TodoService],
    });
    service = TestBed.inject(TodoService);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('getTodoList() should populate the list once', () => {
    expect(service.todoList().length).toBe(0);

    service.getTodoList();
    jest.advanceTimersByTime(300);

    expect(service.todoList().length).toBe(2);

    // Calling again should early-return and not duplicate
    service.getTodoList();
    jest.runOnlyPendingTimers();

    expect(service.todoList().length).toBe(2);
  });

  it('getTodo() should select a todo by id', () => {
    // ensure list is loaded
    service.getTodoList();
    jest.advanceTimersByTime(300);

    service.getTodo(2);
    jest.advanceTimersByTime(300);

    expect(service.selectedTodo()).toEqual({
      id: 2,
      title: 'Learn RxJS',
      completed: true,
    });
  });
});
