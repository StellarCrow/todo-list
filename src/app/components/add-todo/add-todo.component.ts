import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITodo } from 'src/app/models/ITodo';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  public addTodoForm: FormGroup;

  @Output() createTodo = new EventEmitter<object>();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.addTodoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      deadline: ['', [Validators.required]],
    });
  }

  public filterDate(d: Date | null): boolean {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return d > yesterday;
  }

  public onSubmit(): void {
    const todo = {
      ...this.addTodoForm.value,
      id: uuidv4(),
      creationDate: new Date(),
    };
    this.createTodo.emit(todo);
  }
}
