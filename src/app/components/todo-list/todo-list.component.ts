import { ITodo } from './../../models/ITodo';
import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ModifyFormComponent } from '../modify-form/modify-form.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todoList: Observable<ITodo[]>;

  constructor(private todoService: TodoService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.todoList = this.todoService.todos$;
  }

  public trackByFn(index: number, item: ITodo): number {
    return item.id;
  }

  public checkTodo(todo: ITodo): void {
    this.todoService.checkTodo(todo.id);
  }

  public deleteTodo(todo: ITodo): void {
    this.todoService.deleteTodo(todo.id);
  }

  public modifyTodo(todo: ITodo): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { todo };

    const dialogRef = this.dialog.open(ModifyFormComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }
}
