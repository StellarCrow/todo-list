import { ITodo } from './../../models/ITodo';
import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todoList: ITodo[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.getTodos().subscribe((list) => {
      this.todoList = list;
    });
  }

  public checkTodo(todo: ITodo): void {
    this.todoService.checkTodo(todo.id);
  }

  public deleteTodo(todo: ITodo): void {
    this.todoService.deleteTodo(todo.id);
  }
}
