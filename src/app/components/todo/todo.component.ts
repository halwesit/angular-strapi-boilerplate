import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/service/todo.service';
import { TodoAddModalComponent } from '../todo-add-modal/todo-add-modal.component';
import { TodoModalComponent } from '../todo-modal/todo-modal.component';
@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  @Input() Todos: Todo[] = []

  constructor(public dialog: MatDialog, private todoService: TodoService) { }

  ngOnInit(): void {
  }


  openDialog(todo: Todo) {
    const dialogRef = this.dialog.open(TodoModalComponent, {
      width: '500px',
      data: {
        todo: todo
      },
    });
    dialogRef.componentInstance.onDeleteTodo.subscribe(todo => {
      this.todoService.deleteTodo(todo).subscribe(() => {
        this.Todos = this.Todos.filter(t => t.id !== todo.id)
      })
    })
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  addNewTask() {
    const dialogRef = this.dialog.open(TodoAddModalComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.onAddTask.subscribe((todo: Todo) => {
      this.todoService.addTodo(todo).subscribe((newTodo: Todo) => {
        this.Todos.push(newTodo)
      })
    })
    dialogRef.afterClosed().subscribe(() => {
    });
  }
}

