import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Todo } from '../interfaces/todo';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient, private authService: AuthService) {

  }

  getTodos(): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json',
        Authorization: `Bearer ${this.authService.getJWTtoken}`
      })
    };
    return this.http.get<User>(`${environment.apiURL}/users/me`, httpOptions)
  }

  updateTodo(todo: Todo): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json',
        Authorization: `Bearer ${this.authService.getJWTtoken}`
      })
    };
    return this.http.put<Todo>(`${environment.apiURL}/todos/${todo.id}`, todo, httpOptions)
  }

  addTodo(todo: Todo): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json',
        Authorization: `Bearer ${this.authService.getJWTtoken}`
      })
    };

    return this.http.post<Todo>(`${environment.apiURL}/todos/`, todo, httpOptions)
  }

  deleteTodo(todo: Todo): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'accept': 'application/json',
        Authorization: `Bearer ${this.authService.getJWTtoken}`
      })
    };
    return this.http.delete<Todo>(`${environment.apiURL}/todos/${todo.id}`, httpOptions)
  }

}
