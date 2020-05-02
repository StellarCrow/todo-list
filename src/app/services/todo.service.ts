import { ITodo } from 'src/app/models/ITodo';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RandomService } from './random.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todoList: ITodo[];
  private url = 'https://jsonplaceholder.typicode.com/todos';

  constructor(private httpService: HttpService, private randomService: RandomService) {}

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

  public postTodo(item: ITodo): Observable<ITodo> {
    return this.httpService.post<ITodo>(this.url, item);
  }

  public deleteTodo(id: number): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.httpService.delete<void>(url);
  }

  public modifyTodo(id: number, item: ITodo) {
    const url = `${this.url}/${id}`;
    this.httpService.put<ITodo>(url, item).subscribe((res) => {
      console.log(res);
      const index = this.todoList.findIndex((todo) => todo.id === id);
      this.todoList[index] = res;
    });
  }

  public checkTodo(id: number, check: object): Observable<ITodo> {
    const url = `${this.url}/${id}`;
    return this.httpService.patch<ITodo>(url, check);
  }
}
