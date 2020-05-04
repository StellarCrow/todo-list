import { ITodo } from './../../models/ITodo';
import { Component, OnInit, Input } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
})
export class TodoListComponent implements OnInit {
  public todoList: ITodo[];

  @Input() searchText: string;

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.todoService.todos$.subscribe((list) => {
      this.todoList = list;
    });
    // this.todoService.filteredTodos$.subscribe(list => {
    //   this.todoList = list;
    // })
    // this.todoService.getTodos().subscribe();
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
}
