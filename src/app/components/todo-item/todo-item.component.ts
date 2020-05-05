import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ITodo } from 'src/app/models/ITodo';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModifyFormComponent } from '../modify-form/modify-form.component';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss'],
})
export class TodoItemComponent {
  @Input() todo: ITodo;

  @Output() checkedTodo = new EventEmitter<ITodo>();
  @Output() deletedTodo = new EventEmitter<ITodo>();

  constructor(public dialog: MatDialog) {}

  public checkTodo(): void {
    this.checkedTodo.emit(this.todo);
  }

  public deleteTodo(): void {
    this.deletedTodo.emit(this.todo);
  }

  public toggleModify() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {todo: this.todo}

    const dialogRef = this.dialog.open(ModifyFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
