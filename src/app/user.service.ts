import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:8000/users/'; // Atualize a URL para o endpoint correto

  constructor(private http: HttpClient) { }

  // Função para registrar um novo usuário
  register(data: any) {
    console.log('Registrando usuário com os dados:', data); // Log para verificar os dados
    return this.http.post(this.apiUrl, data); // Enviar os dados para o endpoint correto
  }
}
