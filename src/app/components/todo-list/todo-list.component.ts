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
    this.todoService.getTodoList().subscribe((list) => {
      this.todoList = list;
    });
  }

  public checkTodo(todo: ITodo): void {
    const index = this.todoList.findIndex((item) => item.id === todo.id);
    this.todoList[index] = { ...this.todoList[index], completed: !this.todoList[index].completed };
  }

  public deleteTodo(todo: ITodo): void {
    const index = this.todoList.findIndex((item) => item.id === todo.id);
    this.todoList.splice(index, 1);
  }

  public createTodo(): void {
    const item: ITodo = {
      userId: 1,
      id: 1,
      title: '',
      completed: true,
      username: 'Someone',
      creationDate: new Date('2019-01-16'),
      deadline: new Date('2020-01-16'),
    };
    this.todoService.postTodo(item).subscribe((newTodo) => {
      this.todoList.push(newTodo);
    });
  }
}
