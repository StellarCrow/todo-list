import { sorting } from './../../constants/constants';
import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  public sorts: object[];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.sorts = sorting;
  }

  public onChange(event: MatRadioChange): void {
    const radioButton: MatRadioButton = event.source;
    this.todoService.sortTodos(radioButton.value)
  }
}
