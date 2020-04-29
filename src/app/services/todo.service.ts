import { ITodo } from './../models/ITodo';
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
    return this.httpService.list<ITodo[]>(this.url).pipe(
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

  public deleteTodo(id: number): void {
    const url = `${this.url}/${id}`;
    this.httpService.delete(url).subscribe((data) => {
      console.log(data);
      const index = this.todoList.findIndex((todo) => todo.id === id);
      this.todoList.splice(index, 1);
    });
  }

  public modifyTodo(id: number, item: ITodo) {
    const url = `${this.url}/${id}`;
    this.httpService.put<ITodo>(url, item).subscribe((res) => {
      console.log(res);
      const index = this.todoList.findIndex((todo) => todo.id === id);
      this.todoList[index] = res;
    });
  }

  public checkTodo(id: number, check: object) {
    const url = `${this.url}/${id}`;
    this.httpService.patch<ITodo>(url, check).subscribe((res) => {
      console.log(res);
      const index = this.todoList.findIndex((todo) => todo.id === id);
      this.todoList[index] = res;
    });
  }
}
