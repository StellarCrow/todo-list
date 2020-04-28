import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  public list<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public get<T>(url: string): Observable<T> {
    return this.http.get<T>(url);
  }

  public post<T>(url: string, item: object): Observable<T> {
    return this.http.post<T>(url, JSON.stringify(item));
  }

  public delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }

  public put<T>(url: string, item: object): Observable<T> {
    return this.http.put<T>(url, JSON.stringify(item));
  }

  public patch<T>(url: string, field: object): Observable<T> {
    return this.http.patch<T>(url, JSON.stringify(field));
  }
}
