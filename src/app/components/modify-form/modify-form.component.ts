import { ITodo } from './../../models/ITodo';
import { Component, OnInit, Input, Output, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modify-form',
  templateUrl: './modify-form.component.html',
  styleUrls: ['./modify-form.component.scss'],
})
export class ModifyFormComponent implements OnInit {
  public modifyForm: FormGroup;

  @Input() todo: ITodo;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService, @Inject(MAT_DIALOG_DATA) data) {
    this.todo = data.todo;
  }

  ngOnInit(): void {
    this.modifyForm = this.formBuilder.group({
      title: [this.todo.title, [Validators.required, Validators.minLength(1)]],
      deadline: [this.todo.deadline, [Validators.required]],
    });
  }

  public onSubmit(): void {
    console.log(this.todo.deadline);
    
    const modified = { ...this.todo, title: this.modifyForm.value.title, deadline: this.todo.deadline };
    this.todoService.modifyTodo(modified);
  }
}
