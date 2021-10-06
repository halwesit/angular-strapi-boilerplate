import { Component, OnInit } from '@angular/core';
import { Todo } from 'src/app/interfaces/todo';
import { User } from 'src/app/interfaces/user';
import { TodoService } from 'src/app/service/todo.service';
@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  public todos: any;
  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.getTodos()
  }
  getTodos() {
    this.todoService.getTodos().subscribe((user: User) => {
      this.todos = user.todos;
      this.todos = this.todos.sort(function (a: any, b: any) {
        return (a.done === b.done) ? 0 : a.done ? 1 : -1;
      });
    })

  }

}
