import { sorting, filters } from './../../constants/constants';
import { Component, OnInit } from '@angular/core';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { TodoService } from 'src/app/services/todo.service';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { UserService } from '../../services/user.service';
import { IFilter } from '../../models/IFilter';
import { ISort } from '../../models/ISort';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public sorts: ISort[];
  public filters: IFilter[];
  private activeFilters = [];

  constructor(private todoService: TodoService, private userService: UserService) {}

  ngOnInit(): void {
    const name = this.userService.getUser();
    const newFilter = { key: 'username', value: name, title: 'My todos' };
    this.sorts = sorting;
    this.filters = [...filters, newFilter];
  }

  public onChange(event: MatRadioChange): void {
    const radioButton: MatRadioButton = event.source;
    this.todoService.sortTodos(radioButton.value);
  }

  public onChangeFilter(event: MatCheckboxChange): void {
    const eventKey = event.source.name;
    const eventValue = event.source.value;
    const filterObject = { key: eventKey, value: eventValue };
    const elementIndex = this.activeFilters.findIndex((item) => item.key === eventKey && item.value === eventValue);
    if (elementIndex > -1) {
      this.activeFilters.splice(elementIndex, 1);
    } else {
      this.activeFilters.push(filterObject);
    }
    this.todoService.filterTodos(this.activeFilters);
  }
}
