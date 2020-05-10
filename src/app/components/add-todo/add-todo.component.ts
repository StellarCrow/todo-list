import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITodo } from 'src/app/models/ITodo';
import { v4 as uuidv4 } from 'uuid';
import { TodoService } from 'src/app/services/todo.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  public addTodoForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private todoService: TodoService, private userService: UserService) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.addTodoForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      deadline: ['', [Validators.required]],
    });
  }

  public onSubmit(): void {
    const user= this.userService.getUser();
    const item: ITodo = {
      ...this.addTodoForm.value,
      userId: 1,
      id: uuidv4(),
      completed: false,
      username: user,
      creationDate: new Date(),
    };
    this.todoService.createTodo(item);
  }
}
