import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddTaskModalComponent } from '../add-task-modal/add-task-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  constructor(private modalController: ModalController) {}

  async openAddTaskModal() {
    const modal = await this.modalController.create({
      component: AddTaskModalComponent
    });
    return await modal.present();
  }
}
