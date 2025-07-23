import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { of as observableOf, lastValueFrom } from 'rxjs';
import { jest } from '@jest/globals';

import { TodoFormComponent } from './todo-form.component-v2';
import { todoItem, TodoService } from '../../../data';

const mockTodoService = {
  getTodoById$: jest.fn().mockReturnValue(observableOf(todoItem)),
  submitTodo$: jest.fn().mockReturnValue(observableOf([])),
};

describe('TodoFormComponent', () => {
  let component: TodoFormComponent;
  let fixture: ComponentFixture<TodoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFormComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: '1' } } },
        },
        { provide: TodoService, useValue: mockTodoService },
        provideRouter([]),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate form on init when id param is present', () => {
    expect(component.form.value).toEqual({
      title: todoItem.title,
      description: todoItem.description,
    });
  });

  it('should call submitTodo$ on submitRequest$', async () => {
    component.form.setValue({
      title: 'Test Title',
      description: 'Test Description',
    });

    await lastValueFrom(component.submitRequest$());

    expect(mockTodoService.submitTodo$).toHaveBeenCalledWith(
      { title: 'Test Title', description: 'Test Description' },
      1
    );
  });

  it('should not call getTodoById$ if no id is present', async () => {
    // Override ActivatedRoute without id
    TestBed.overrideProvider(ActivatedRoute, {
      useValue: { snapshot: { params: {} } },
    });

    const newFixture = TestBed.createComponent(TodoFormComponent);
    const newComponent = newFixture.componentInstance;
    newFixture.detectChanges();

    expect(mockTodoService.getTodoById$).not.toHaveBeenCalled();
  });
});
