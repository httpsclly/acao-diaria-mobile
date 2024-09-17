import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

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

  constructor(private modalController: ModalController) {}

  dismiss() {
    this.modalController.dismiss();
  }

  addTask() {
    if (this.taskName.trim() !== '' && this.taskDescription.trim() !== '') {
      // Lógica para adicionar a tarefa
      console.log('Nome da Tarefa:', this.taskName);
      console.log('Descrição da Tarefa:', this.taskDescription);
      console.log('Data:', this.taskDate);
      console.log('Quando Inicia:', this.taskStartTime);
      console.log('Quando Termina:', this.taskEndTime);
      console.log('Cor da Tarefa:', this.taskColor);

      // Fechar o modal após adicionar a tarefa
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
