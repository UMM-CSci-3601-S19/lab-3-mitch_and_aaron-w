import {Component, OnInit} from '@angular/core';
import {TodoListService} from './todo-list.service';
import {Todo} from './todo';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-todo-list-component',
  templateUrl: 'todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: []
})

export class TodoListComponent implements OnInit {
  // These are public so that tests can reference them (.spec.ts)
  public todos: Todo[];
  public filteredTodos: Todo[];

  public todoId: string;
  public todoOwner: string;
  public todoStatus: string;
  public todoBody: string;
  public todoCategory: string;


  // Inject the TodoListService into this component.
  // That's what happens in the following constructor.
  //
  // We can call upon the service for interacting
  // with the server.

  constructor(private todoListService: TodoListService) {

  }

  public filterTodos(searchId: string, searchStatus: string, searchCategory: string, searchOwner: string, searchBody: string): Todo[] {

    this.filteredTodos = this.todos;

    // Filter by name
    if (searchId != null) {
      searchId = searchId.toLocaleLowerCase();

      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchId || todo._id.toLowerCase().indexOf(searchId.toLowerCase()) !== -1;
      });
    }

    // Filter by status
    if (searchStatus != null) {
      this.filteredTodos = this.filteredTodos.filter( (todo: Todo) => {
        return todo.status === (searchStatus.toLowerCase() === "true");
      });
    }

    // Filter by category
    if (searchCategory != null) {
      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchCategory || todo.category.toLowerCase().indexOf(searchCategory.toLowerCase()) !== -1;
      });
    }

    // Filter by owner
    if (searchOwner != null) {
      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchOwner || todo.owner.toLowerCase().indexOf(searchOwner.toLowerCase()) !== -1;
      });
    }

    // Filter by body
    if (searchBody != null) {
      this.filteredTodos = this.filteredTodos.filter(todo => {
        return !searchBody || todo.body.toLowerCase().indexOf(searchBody.toLowerCase()) !== -1;
      });
    }

    console.log(this.filteredTodos.length);
    return this.filteredTodos;
  }

  /**
   * Starts an asynchronous operation to update the users list
   *
   */
  refreshTodos(): Observable<Todo[]> {
    // Get Todos returns an Observable, basically a "promise" that
    // we will get the data from the server.
    //
    // Subscribe waits until the data is fully downloaded, then
    // performs an action on it (the first lambda)

    const todos: Observable<Todo[]> = this.todoListService.getTodos();
    todos.subscribe(
      returnedTodos => {
        this.todos = returnedTodos;
        this.filterTodos(this.todoId, this.todoStatus, this.todoCategory, this.todoOwner, this.todoBody);
      },
      err => {
        console.log(err);
      });
    return todos;
  }


  ngOnInit(): void {
    this.refreshTodos();
  }
}
