import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-task-modal',
  templateUrl: './add-task-modal.component.html',
  styleUrls: ['./add-task-modal.component.scss'],
})
export class AddTaskModalComponent {
  taskName: string = '';
  taskDescription: string = '';
  taskDate: string = '';
  taskStartTime: string = '';
  taskEndTime: string = '';
  taskColor: string = 'red'; // Valor padrão para a cor da tarefa

  // Variáveis para controlar a visibilidade dos componentes ion-datetime
  showDatePicker: boolean = false;
  showStartTimePicker: boolean = false;
  showEndTimePicker: boolean = false;

  // Definindo minDate e maxDate
  minDate: string = new Date().toISOString().split('T')[0]; // Data mínima é hoje
  maxDate: string = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0]; // Data máxima é 1 ano a partir de hoje

  constructor(private modalController: ModalController, private http: HttpClient) {}

  dismiss() {
    this.modalController.dismiss();
  }

  async addTask() {
    if (this.taskName.trim() !== '' && this.taskDescription.trim() !== '') {
      // Ajustar a data para o formato ISO antes de enviar ao backend
      const formattedDate = new Date(this.taskDate).toISOString().split('T')[0];

      const newTask = {
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        taskDate: formattedDate, // Enviando a data no formato ISO
        taskStartTime: this.taskStartTime,
        taskEndTime: this.taskEndTime,
        taskColor: this.taskColor,
      };

      // Configurar headers para o POST request
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      try {
        const response = await this.http.post<any>('http://127.0.0.1/acaodiaria/api.php', newTask, { headers, responseType: 'text' as 'json' }).toPromise();
        console.log('Resposta da API:', response);

        // Tentar converter a resposta em JSON
        const jsonResponse = JSON.parse(response);
        console.log('Resposta JSON:', jsonResponse);

        // Verifica se a resposta contém mensagem de sucesso
        if (jsonResponse && jsonResponse.message && jsonResponse.message.includes('sucesso')) {
          console.log('Tarefa adicionada com sucesso!');
          this.dismiss(); // Fechar o modal em caso de sucesso
        } else {
          console.error('Erro ao adicionar tarefa:', jsonResponse.message);
          this.dismiss(); // Fechar o modal em caso de erro
        }
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        this.dismiss(); // Fechar o modal em caso de erro
      }
    } else {
      console.warn('Os campos Nome da Tarefa e Descrição são obrigatórios.');
      this.dismiss(); // Fechar o modal se os campos obrigatórios não forem preenchidos
    }
  }

  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
    this.showStartTimePicker = false;
    this.showEndTimePicker = false;
  }

  toggleStartTimePicker() {
    this.showStartTimePicker = !this.showStartTimePicker;
    this.showDatePicker = false;
    this.showEndTimePicker = false;
  }

  toggleEndTimePicker() {
    this.showEndTimePicker = !this.showEndTimePicker;
    this.showDatePicker = false;
    this.showStartTimePicker = false;
  }

  hideDatePicker() {
    this.showDatePicker = false; // Apenas ocultar o date picker sem alterar o formato da data
  }

  hideStartTimePicker() {
    if (this.taskStartTime) {
      const date = new Date(this.taskStartTime);
      this.taskStartTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    this.showStartTimePicker = false;
  }

  hideEndTimePicker() {
    if (this.taskEndTime) {
      const date = new Date(this.taskEndTime);
      this.taskEndTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    this.showEndTimePicker = false;
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formata a data para o padrão brasileiro
  }
}
