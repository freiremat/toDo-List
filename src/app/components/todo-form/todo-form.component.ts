import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { TodoSignalsService } from 'src/app/services/todo-signals.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule
  ]
})

export class TodoFormComponent {

  private todoService = inject(TodoSignalsService);
  public allTodos = this.todoService.todoState();

  public todosForm = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(5)])
  });
  

  public handleCreateNewtodo(): void {
    if (this.todosForm.valid && this.todosForm.value)
{
  // const title = this.todosForm.value.title;
  const title = String(this.todosForm.controls['title'].value);
  const description = String(this.todosForm.controls['description'].value);
  // verifica o id do ultimo todo criado e incrementa para o novo todo ser criado,
  // caso nao haja nenhum todo criado, o id do primeiro todo sera 1
  const id = this.allTodos.length > 0 ? this.allTodos.length + 1 : 1;
  const done = false;

  this.todoService.updateTodos({ id, title, description, completed: done });
}  }
}
