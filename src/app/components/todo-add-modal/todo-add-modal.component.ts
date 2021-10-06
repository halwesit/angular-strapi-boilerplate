import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Todo } from 'src/app/interfaces/todo';
import { TodoService } from 'src/app/service/todo.service';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-add-modal',
  templateUrl: './todo-add-modal.component.html',
  styleUrls: ['./todo-add-modal.component.css']
})
export class TodoAddModalComponent implements OnInit {
  todoForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  @Output() onAddTask: EventEmitter<{ title: string, content: string, done: boolean }> = new EventEmitter();

  constructor(private todoService: TodoService, public dialogRef: MatDialogRef<TodoAddModalComponent>) { }

  ngOnInit(): void {

  }

  closeModal() {
    this.dialogRef.close(TodoAddModalComponent)
  }

  addTask() {
    let todo: any = {
      title: this.todoForm.controls['title'].value,
      content: this.todoForm.controls['content'].value,
      done: false,
      user: JSON.parse(localStorage.getItem('user') || '{}')
    }
    this.onAddTask.emit(todo);
    this.closeModal()
  }
}
