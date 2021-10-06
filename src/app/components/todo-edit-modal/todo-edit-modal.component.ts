import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoService } from 'src/app/service/todo.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Todo } from 'src/app/interfaces/todo';

@Component({
  selector: 'app-todo-edit-modal',
  templateUrl: './todo-edit-modal.component.html',
  styleUrls: ['./todo-edit-modal.component.css']
})
export class TodoEditModalComponent implements OnInit {

  todoForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });


  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private todoService: TodoService, public dialog: MatDialog, public dialogRef: MatDialogRef<TodoEditModalComponent>) { }

  public todo: any
  ngOnInit(): void {
    this.todo = this.data.todo
    this.todoForm.controls['title'].setValue(this.todo.title)
    this.todoForm.controls['content'].setValue(this.todo.content)
  }

  closeModal() {
    this.dialogRef.close(TodoEditModalComponent)
  }

  updateTodo(todo: Todo) {
    let newTodo: Todo = todo
    newTodo.title = this.todoForm.controls['title'].value
    newTodo.content = this.todoForm.controls['content'].value

    this.todoService.updateTodo(newTodo).subscribe(res => {
      this.closeModal()
    })
  }

}
