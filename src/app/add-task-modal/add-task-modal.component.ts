import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../user.service'; // Certifique-se de que o caminho está correto

interface ApiResponse {
  message: string;
  // Adicione outras propriedades que sua API pode retornar, se necessário
}

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

  constructor(private modalController: ModalController, private userService: UserService) {}

  // Método para fechar o modal
  dismiss() {
    this.modalController.dismiss();
  }

  // Método para adicionar uma nova tarefa
  async addTask() {
    if (this.taskName.trim() !== '' && this.taskStartTime && this.taskEndTime) {
      const newTask = {
        title: this.taskName,
        color: this.taskColor,
        completed: false,
        start_time: this.taskDate + 'T' + this.taskStartTime + ':00', // Concatenando data e hora de início
        end_time: this.taskDate + 'T' + this.taskEndTime + ':00', // Concatenando data e hora de término
        owner_id: 1 // Adicione o ID do proprietário conforme necessário
      };

      try {
        const response = await this.userService.addTask(newTask).toPromise();

        if (response && (response as ApiResponse).message) {
          console.log('Resposta da API:', response);
          console.log('Tarefa adicionada com sucesso!');
          this.dismiss(); // Fechar o modal em caso de sucesso
        } else {
          console.error('Erro ao adicionar tarefa: Resposta inválida ou sem mensagem');
          this.dismiss(); // Fechar o modal em caso de erro
        }
      } catch (error) {
        console.error('Erro ao adicionar tarefa:', error);
        this.dismiss(); // Fechar o modal em caso de erro
      }
    } else {
      console.warn('Os campos Nome da Tarefa, Horário de Início e Término são obrigatórios.');
      // Você pode manter o modal aberto para o usuário corrigir os dados, se desejar
    }
  }

  // Métodos para alternar a visibilidade dos componentes ion-datetime
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

  // Métodos para ocultar os seletores de data e hora
  hideDatePicker() {
    this.showDatePicker = false; 
  }

  hideStartTimePicker() {
    this.showStartTimePicker = false;
  }

  hideEndTimePicker() {
    this.showEndTimePicker = false;
  }

  // Método para formatar a data para o padrão brasileiro
  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR'); // Formata a data para o padrão brasileiro
  }
}
