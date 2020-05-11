import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITodo } from 'src/app/models/ITodo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  private checkedImg = 'assets/images/checked.png';
  private uncheckedImg = 'assets/images/unchecked.png';
  @Input() todo: ITodo;

  @Output() checkedTodo = new EventEmitter<ITodo>();
  @Output() deletedTodo = new EventEmitter<ITodo>();
  @Output() modifiedTodo = new EventEmitter<ITodo>();

  get imageSrc(): string {
    return this.todo.completed ? this.checkedImg : this.uncheckedImg;
  }

  public checkTodo(): void {
    this.checkedTodo.emit(this.todo);
  }

  public deleteTodo(): void {
    this.deletedTodo.emit(this.todo);
  }

  public toggleModify(): void {
    this.modifiedTodo.emit(this.todo);
  }
}
