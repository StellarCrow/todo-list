import { ITodo } from './../../models/ITodo';
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-modify-form',
  templateUrl: './modify-form.component.html',
  styleUrls: ['./modify-form.component.scss'],
})
export class ModifyFormComponent implements OnInit {
  public modifyForm: FormGroup;
  public fieldOnFocus = false;

  @Input() todo: ITodo;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {}

  ngOnInit(): void {
    this.modifyForm = this.formBuilder.group({
      title: [this.todo.title, [Validators.required, Validators.minLength(1)]],
    });
  }

  public onSubmit(): void {
   const modified = {...this.todo, title: this.modifyForm.value.title};
    this.todoService.modifyTodo(modified);
  }

  public toggleButton(): void {
    this.fieldOnFocus = !this.fieldOnFocus;
  }
}
