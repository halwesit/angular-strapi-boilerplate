import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { TodoService } from 'src/app/service/todo.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: any = {}
  constructor(private todoService: TodoService) {


  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '')
    this.todoService.getTodos().subscribe((user: User) => {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    })
    console.log(this.user)
  }


}
