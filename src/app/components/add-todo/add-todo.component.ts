import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITodo } from 'src/app/models/ITodo';
import { v4 as uuidv4 } from 'uuid';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  public addTodoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService) {}

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
    const item: ITodo = {
      ...this.addTodoForm.value,
      userId: 1,
      id: uuidv4(),
      completed: false,
      username: 'Someone',
      creationDate: new Date(),
    };
    this.todoService.createTodo(item);
  }
}
