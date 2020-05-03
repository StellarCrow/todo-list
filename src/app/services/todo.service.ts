import { ITodo } from 'src/app/models/ITodo';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { RandomService } from './random.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todoList: ITodo[] = [];
  private subject = new BehaviorSubject<ITodo[]>([]);
  public todos$ = this.subject.asObservable();
  private url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private httpService: HttpService, private randomService: RandomService) {}

  public getTodos(): Observable<ITodo[]> {
    return this.httpService.get<ITodo[]>(this.url).pipe(
      map((items) => {
        const fullItems = items.map((item) => {
          item.creationDate = this.randomService.getRandomDate(2020, [1, 4]);
          item.deadline = this.randomService.getRandomDate(2020, [5, 11]);
          item.username = this.randomService.getRandomName();
          return item;
        });
        this.todoList = fullItems;
        this.subject.next(fullItems);
        return fullItems;
      }),
      catchError((err) => {
        console.log(err);
        return [];
      })
    );
  }

  public getTodoList(): Observable<ITodo[]> {
    return this.httpService.get<ITodo[]>(this.url).pipe(
      map((items) => {
        return items.map((item) => {
          item.creationDate = this.randomService.getRandomDate(2020, [1, 4]);
          item.deadline = this.randomService.getRandomDate(2020, [5, 11]);
          item.username = this.randomService.getRandomName();
          return item;
        });
      })
    );
  }

  public createTodo(item: ITodo): void {
    this.todoList.unshift(item);
    this.subject.next(this.todoList);
  }

  public deleteTodo(id: number): void {
    const index = this.todoList.findIndex((item) => item.id === id);
    this.todoList.splice(index, 1);
    this.subject.next(this.todoList);
  }

  public modifyTodo(id: number, item: ITodo) {
    const index = this.todoList.findIndex((todo) => todo.id === id);
    this.todoList[index] = item;
    this.subject.next(this.todoList);
  }

  public checkTodo(id: number): void {
    const index = this.todoList.findIndex((item) => item.id === id);
    this.todoList[index] = { ...this.todoList[index], completed: !this.todoList[index].completed };
  }
}
