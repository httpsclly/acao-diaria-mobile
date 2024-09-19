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

  constructor(
    private modalController: ModalController,
    private http: HttpClient
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  async addTask() {
    if (this.taskName.trim() !== '' && this.taskDescription.trim() !== '') {
      const newTask = {
        taskName: this.taskName,
        taskDescription: this.taskDescription,
        taskDate: this.taskDate,
        taskStartTime: this.taskStartTime,
        taskEndTime: this.taskEndTime,
        taskColor: this.taskColor
      };

      // Configurar headers para o POST request
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      try {
        const response = await this.http.post<any>('http://127.0.0.1/acaodiaria/api.php', newTask, { headers, responseType: 'text' as 'json' }).toPromise();
        console.log('Resposta da API:', response);

        // Tentar converter a resposta em JSON
        try {
          const jsonResponse = JSON.parse(response);
          console.log('Resposta JSON:', jsonResponse);
          
          // Verifica se a resposta contém mensagem de sucesso
          if (jsonResponse && jsonResponse.message && jsonResponse.message.includes('sucesso')) {
            // Fechar o modal em caso de sucesso
            this.dismiss();
          } else {
            // Fechar o modal em caso de erro
            this.dismiss();
          }
        } catch (jsonError) {
          // Tratamento de erro específico para a análise do JSON
          console.error('Erro ao analisar resposta JSON:', jsonError);
          // Fechar o modal em caso de erro de análise
          this.dismiss();
        }
      } catch (error) {
        // Tratamento de erro específico para o POST request
        console.error('Erro ao adicionar tarefa:', error);
        // Fechar o modal em caso de erro no request
        this.dismiss();
      }
    } else {
      // Fechar o modal se o nome e a descrição não forem preenchidos
      this.dismiss();
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
    this.showDatePicker = false;
  }

  hideStartTimePicker() {
    this.showStartTimePicker = false;
  }

  hideEndTimePicker() {
    this.showEndTimePicker = false;
  }
}
