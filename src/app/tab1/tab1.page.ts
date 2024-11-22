import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { UserService } from '../user.service';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  tasks: any[] = [];
  loading: boolean = true;

  constructor(private modalController: ModalController, private userService: UserService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.userService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks.map(task => ({
          ...task,
          start_time: this.convertToBrazilTime(task.start_time),
          end_time: this.convertToBrazilTime(task.end_time),
          expired: this.isExpired(task.end_time),
        }));
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao carregar tarefas:', error);
        this.loading = false;
      }
    );
  }

  convertToBrazilTime(utcTime: string): string {
    const date = new Date(utcTime);
    const options: Intl.DateTimeFormatOptions = {
      timeZone: 'America/Sao_Paulo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    return date.toLocaleString('pt-BR', options);
  }

  isExpired(endTime: string): boolean {
    const now = new Date();
    const endDate = new Date(endTime);
    return now.getTime() > endDate.getTime();
  }
  
  async openAddTaskModal() {
    const modal = await this.modalController.create({
      component: AddTaskModalComponent,
    });
    return await modal.present();
  }

  deleteTask(taskId: number) {
    this.userService.deleteTask(taskId).subscribe(
      () => {
        console.log('Tarefa excluída com sucesso!');
        this.fetchTasks();
      },
      (error) => {
        console.error('Erro ao excluir tarefa:', error);
      }
    );
  }
}
