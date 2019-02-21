import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {UserListComponent} from './users/user-list.component';
import {UserListService} from './users/user-list.service';
import {TodoListComponent} from './todos/todo-list.component';
import {TodoListService} from './todos/todo-list.service';
import {Routing} from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import {CustomModule} from './custom.module';
import {UserComponent} from './users/user.component';
import {TodoComponent} from './todos/todo.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    Routing,
    CustomModule,
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    UserListComponent,
    UserComponent,
    TodoListComponent,
    TodoComponent,

  ],
  providers: [
    UserListService,
    TodoListService,
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
