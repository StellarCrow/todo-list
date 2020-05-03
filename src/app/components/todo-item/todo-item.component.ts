import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITodo } from 'src/app/models/ITodo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo: ITodo;

  @Output() checkedTodo = new EventEmitter<ITodo>();
  @Output() deletedTodo = new EventEmitter<ITodo>();

  public checkTodo(): void {
    this.checkedTodo.emit(this.todo);
  }

  public deleteTodo(): void {
    this.deletedTodo.emit(this.todo);
  }
}
