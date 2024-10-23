import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:8000/users/'; // URL para o endpoint de usuários
  private tasksApiUrl = 'http://127.0.0.1:8000/tasks/'; // URL para o endpoint de tarefas

  constructor(private http: HttpClient) { }

  // Função para registrar um novo usuário
  register(data: any) {
    console.log('Registrando usuário com os dados:', data); // Log para verificar os dados
    return this.http.post(this.apiUrl, data); // Enviar os dados para o endpoint correto
  }

   // Função para adicionar uma nova tarefa
   addTask(task: any): Observable<any> {
    return this.http.post<any>(this.tasksApiUrl, task);
  }

  // Função para buscar todas as tarefas
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.tasksApiUrl); // Busca todas as tarefas do endpoint
  }

   // Função para excluir uma tarefa
   deleteTask(taskId: number) {
    console.log(`Excluindo tarefa com ID: ${taskId}`);
    return this.http.delete(`${this.tasksApiUrl}${taskId}/`); // Endpoint para excluir a tarefa
  }
}
