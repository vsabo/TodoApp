import { Component } from '@angular/core';
import { TodoState, TodoFacade } from './todo.facede';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  vm$: Observable<TodoState> = this.facade.vm$;
  myGroup: FormGroup;

  constructor(public facade: TodoFacade) { }

  ngOnInit() {
    this.myGroup = new FormGroup({
      searchBar: new FormControl("")
    });
  }

  onSubmit(){
    console.log(this.myGroup.value);
    this.facade.addItem("banana");
  }
}
