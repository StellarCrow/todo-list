import { sorting, filters } from './../../constants/constants';
import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { TodoService } from 'src/app/services/todo.service';
import { SidenavService } from '../../services/sidenav.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  public sorts: object[];
  public filters: object[];

  constructor(private todoService: TodoService, private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sorts = sorting;
    this.filters = filters;
  }

  public onChange(event: MatRadioChange): void {
    const radioButton: MatRadioButton = event.source;
    this.todoService.sortTodos(radioButton.value)
  }

  public toggleSidenav() {
    this.sidenavService.toggle()
  }
}
