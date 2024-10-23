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
        this.tasks = tasks;
        this.loading = false;
      },
      (error) => {
        console.error('Erro ao carregar tarefas:', error);
        this.loading = false;
      }
    );
  }

  async openAddTaskModal() {
    const modal = await this.modalController.create({
      component: AddTaskModalComponent,
    });
    return await modal.present();
  }

  // Método para excluir uma tarefa
  deleteTask(taskId: number) {
    this.userService.deleteTask(taskId).subscribe(
      () => {
        console.log('Tarefa excluída com sucesso!');
        // Atualiza a lista de tarefas
        this.fetchTasks();
      },
      (error) => {
        console.error('Erro ao excluir tarefa:', error);
      }
    );
  }
}
