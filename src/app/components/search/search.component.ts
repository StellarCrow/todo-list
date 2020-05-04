import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  public searchForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchText: [''],
    });

    const search$ = this.searchForm.controls.searchText.valueChanges.pipe(startWith(''));
    this.todoService.searchTodos(search$);
  }

  public onSubmit(): void {}
}
