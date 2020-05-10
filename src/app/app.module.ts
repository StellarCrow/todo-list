import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { MainPageComponent } from './components/pages/main-page/main-page.component';
import { ModifyFormComponent } from './components/modify-form/modify-form.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchComponent } from './components/search/search.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { HomeComponent } from './components/pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoItemComponent,
    TodoListComponent,
    AddTodoComponent,
    MainPageComponent,
    ModifyFormComponent,
    SidebarComponent,
    SearchComponent,
    DatepickerComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, BrowserAnimationsModule, MaterialModule, FormsModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
