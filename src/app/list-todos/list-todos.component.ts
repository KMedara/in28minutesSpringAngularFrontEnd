import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date
  ){}
}
@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos: Todo[];
  message: string;

  // [
  //   new Todo(1, 'Learn to Dance', false, new Date()),
  //   new Todo(2, 'Become an angular expert', false, new Date()),
  //   new Todo(3, 'Visit France', false, new Date()),
  // ]
  constructor( 
    private tds:TodoDataService,
    private router: Router) { }

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos(){
    this.tds.retrieveAllTodos('in28minutes').subscribe(
      response => { 
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id){
    //console.log(`delete todo ${id}`);
    this.tds.deleteTodo('in28minutes',id).subscribe(
      response => { 
        console.log(response);
        this.message = `Delete of Todo ${id} Successful`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id){
    this.router.navigate(['todos',id]);
  }

  addTodo(){
    this.router.navigate(['todos',-1]);

  }

}
