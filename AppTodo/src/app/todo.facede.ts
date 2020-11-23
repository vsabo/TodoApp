import { TodoModel } from './todo.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, throwError } from 'rxjs';
import {
    map, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

export interface TodoState {
    todoItems: TodoModel[];
    loading: boolean;
}

export interface RandomResponse {
    results: TodoModel[];
  }

let _state: TodoState = {
    todoItems: [],
    loading: false
};   

@Injectable()
export class TodoFacade {
    private store  = new BehaviorSubject<TodoState>(_state);
    private state$ = this.store.asObservable();

    todoItems$ = this.state$.pipe(map(state => state.todoItems), distinctUntilChanged());
    loading$ = this.state$.pipe(map(state => state.loading));

    //ViewModel
    vm$: Observable<TodoState> = combineLatest(this.todoItems$,this.loading$).pipe(
        map( ([todoItems, loading]) => {
          return {todoItems, loading };
        })
    );

    getStateSnapshot(): TodoState {
        return {..._state};
    }

    private updateState(state: TodoState) {
        this.store.next(_state = state); 
    }

    // private updateList() {
    //     var lista = this.getItems();
    //     const todoItems = { ..._state.todoItems, lista};
    //     this.updateState({ ..._state, todoItems, loading: true });
    // }
 
    constructor(private http: HttpClient) {
        this.getItems().subscribe((todoItems) => {
            this.updateState({ ..._state, todoItems, loading: true });
        });
    }

    public addItem(item: string){
        const url = 'https://localhost:44305/todo';
        let res = this.http.post<string>(url, {description: item});
        res.subscribe(() => {
            //this.updateList();
        });
    }

    private getItems(): Observable<TodoModel[]>{
        const url = 'https://localhost:44305/todo';
        return this.http.get<RandomResponse>(url).pipe(
            map(response => response.results)
        );
    }
}