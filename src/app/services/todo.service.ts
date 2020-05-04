import { ITodo } from 'src/app/models/ITodo';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, BehaviorSubject, of, fromEvent, Subject, combineLatest } from 'rxjs';
import { map, catchError, tap, debounceTime, filter, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RandomService } from './random.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList: ITodo[] = [];
  private subject = new BehaviorSubject<ITodo[]>([]);
  public todos$ = this.subject.asObservable();
  public filteredTodos$: Observable<ITodo[]>;
  private url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private httpService: HttpService, private randomService: RandomService) {}

  public getTodos(): Observable<ITodo[]> {
    return this.httpService.get<ITodo[]>(this.url).pipe(
      map((items) => {
        return items.map((item) => {
          item.creationDate = this.randomService.getRandomDate(2020, [1, 4]);
          item.deadline = this.randomService.getRandomDate(2020, [5, 11]);
          item.username = this.randomService.getRandomName();
          return item;
        });
      }),
      tap((list) => {
        this.todoList = list;
        this.subject.next(list);
      }),
      catchError((err) => {
        console.log(err);
        return [];
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

  public modifyTodo(item: ITodo): void {
    const index = this.todoList.findIndex((todo) => todo.id === item.id);
    this.todoList[index] = item;
    this.subject.next(this.todoList);
  }

  public checkTodo(id: number): void {
    const index = this.todoList.findIndex((item) => item.id === id);
    this.todoList[index] = { ...this.todoList[index], completed: !this.todoList[index].completed };
  }

  public searchTodos(searchQuery: Observable<string>) {
    this.filteredTodos$ = combineLatest([this.todos$, searchQuery]).pipe(
      map(([todos, searchString]) => {
        return todos.filter((todo) => {
          return todo.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
        });
      }),
      debounceTime(500),
      distinctUntilChanged()
    );
  }
}
