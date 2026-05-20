import { Injectable, signal } from '@angular/core';
import { Todo } from '../models/model/todo.model';
import { TodoKeyLocalStorage } from '../models/enum/todoKeyLocalStorage';

@Injectable({
  providedIn: 'root'
})
export class TodoSignalsService {

  public todoState = signal<Array<Todo>>([])

  // Método para atualizar a lista de tarefas com base nos dados fornecidos pelo formulário. 
  // Ele verifica se os campos id, title e description não são nulos ou indefinidos antes de atualizar o estado da lista de tarefas. 
  // Se os dados forem válidos, ele usa o método mutate para adicionar uma nova tarefa à lista de tarefas existente.
  public updateTodos({ id, title, description, completed }: Todo): void {
    if ((id && title && description !== null) || undefined) {
      this.todoState.mutate((todos) => {
        if (todos !== null) {
          todos.push(new Todo(id, title, description, completed))
        }
      })
      this.saveTodosInLocalStorage();
    }
  }

  // Metodo para salvar a lista de tarefas no localStorage do navegador. 
  // Ele converte a lista de tarefas em uma string JSON
  // e, em seguida, armazena essa string no localStorage usando a chave definida em TodoKeyLocalStorage.TODO_LIST.
  public saveTodosInLocalStorage(): void {
    const todos = JSON.stringify(this.todoState());
    todos && localStorage.setItem(TodoKeyLocalStorage.TODO_LIST, todos);
  }
}
