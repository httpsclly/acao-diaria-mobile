import { Component } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

import { UserService } from '../user.service';

interface ApiResponse {
  message: string;
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
  taskColor: string = 'red';

  showDatePicker: boolean = false;
  showStartTimePicker: boolean = false;
  showEndTimePicker: boolean = false;

  minDate: string = new Date().toISOString().split('T')[0];
  maxDate: string = new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0];

  constructor(
    private modalController: ModalController,
    private userService: UserService,
    private http: HttpClient,
    private toastController: ToastController
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }

  async addTask() {
    if (this.taskName.trim() !== '' && this.taskDescription.trim() !== '') {
      const formattedDate = new Date(this.taskDate).toISOString();

      const taskData = {
        title: this.taskName,
        description: this.taskDescription,
        date: formattedDate,
        start_time: this.taskStartTime,
        end_time: this.taskEndTime,
        color: this.taskColor,
      };

      this.http.post('http://127.0.0.1:8000/tasks/', taskData).subscribe(
        async (response) => {
          const toast = await this.toastController.create({
            message: 'Tarefa adicionada com sucesso!',
            duration: 2000,
            color: 'success',
          });
          toast.present();
          this.dismiss();
        },
        async (error) => {
          const toast = await this.toastController.create({
            message: 'Erro ao adicionar tarefa.',
            duration: 2000,
            color: 'danger',
          });
          toast.present();
          this.dismiss();
        }
      );
    } else {
      const toast = await this.toastController.create({
        message: 'Os campos Nome da Tarefa e Descrição são obrigatórios.',
        duration: 2000,
        color: 'warning',
      });
      toast.present();
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
    return date.toLocaleDateString('pt-BR');
  }
}
