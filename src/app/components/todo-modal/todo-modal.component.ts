import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/service/todo.service';
import { TodoEditModalComponent } from '../todo-edit-modal/todo-edit-modal.component';

@Component({
  selector: 'app-todo-modal',
  templateUrl: './todo-modal.component.html',
  styleUrls: ['./todo-modal.component.css']
})
export class TodoModalComponent implements OnInit {

  public todo: any
  @Output() onDeleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(public dialogRef: MatDialogRef<TodoEditModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private todoService: TodoService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.todo = this.data.todo
  }
  closeModal() {
    this.dialog.closeAll()
  }
  openEditDialog(todo: Todo) {
    this.dialogRef = this.dialog.open(TodoEditModalComponent, {
      width: '500px',
      data: {
        todo: todo
      }
    });

    this.dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

  undoneTodo(todo: Todo) {
    todo.done = false;
    this.todoService.updateTodo(todo).subscribe(res => {
    })
  }

  doneTodo(todo: Todo) {
    todo.done = true;
    this.todoService.updateTodo(todo).subscribe(res => {
    })
  }

  deleteTodo(todo: Todo) {
    console.log('deleteTodo called')
    this.onDeleteTodo.emit(todo);
    this.closeModal()
  }

}

