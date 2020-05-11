import { ITodo } from 'src/app/models/ITodo';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, catchError, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { RandomService } from './random.service';
import { IFilter } from '../models/IFilter';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todoList: ITodo[] = [];
  private subject = new BehaviorSubject<ITodo[]>([]);
  private search = new BehaviorSubject<string>('');
  private sorting = new BehaviorSubject<string>('');
  private filtering = new BehaviorSubject<IFilter[]>([]);
  public todos$: Observable<ITodo[]>;
  private url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private httpService: HttpService, private randomService: RandomService) {
    this.initTodos();
    this.getTodos().subscribe();
  }

  private initTodos(): void {
    const search$ = this.search.asObservable().pipe(debounceTime(500), distinctUntilChanged());
    const sorting$ = this.sorting.asObservable();
    const filtering$ = this.filtering.asObservable();
    this.todos$ = combineLatest([this.subject.asObservable(), search$, sorting$, filtering$]).pipe(
      map(([todos, searchString, sortQuery, filters]) => {
        let finalTodos = todos.filter((todo) => {
          return todo.title.toLowerCase().indexOf(searchString.toLowerCase()) !== -1;
        });
        if (filters) {
          finalTodos = this.filterByQueries(finalTodos, filters);
        }
        if (sortQuery) {
          return finalTodos.sort(this.dynamicSort(sortQuery));
        }
        return finalTodos;
      })
    );
  }

  private filterByQueries(todos: ITodo[], filters: IFilter[]): ITodo[] {
    return todos.filter((todo) => {
      for (const filter of filters) {
        if (todo[filter.key] !== filter.value) {
          return false;
        }
      }
      return true;
    });
  }

  private dynamicSort(property: string): (a: ITodo, b: ITodo) => number {
    let sortOrder = 1;
    if (property && property[0] === '-') {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a: ITodo, b: ITodo) => {
      const result = a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  }

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
    this.subject.next(this.todoList);
  }

  public searchTodos(searchQuery: string): void {
    this.search.next(searchQuery);
  }

  public sortTodos(sortQuery: string): void {
    this.sorting.next(sortQuery);
  }

  public filterTodos(filters: IFilter[]): void {
    this.filtering.next(filters);
  }
}
