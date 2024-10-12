import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  selectedDate: string | null = null;
  taskColor: string = '#ffcccc'; // Cor padrão para as tarefas (Vermelho Claro)

  // Estrutura para armazenar as tarefas com a cor
  tasks: { [key: string]: { time: string; description: string; color: string }[] } = {
    '2024-10-25': [
      { time: '10:00-13:00', description: 'Arrumar a casa', color: '#ffcccc' }, // Vermelho Claro
      { time: '10:00-13:00', description: 'Treinar com Ana', color: '#ccffcc' }, // Verde Claro
      { time: '10:00-13:00', description: 'Limpar o quintal', color: '#ccf2ff' }, // Azul Claro
    ],
    // Adicione mais datas e tarefas conforme necessário
  };

  tasksForSelectedDate: { time: string; description: string; color: string }[] = [];

  constructor() {}

  onDateSelected(event: any) {
    const selectedDate = event.detail.value.split('T')[0]; // Obtém a data no formato 'yyyy-MM-dd'
    this.selectedDate = selectedDate;
    this.tasksForSelectedDate = this.tasks[selectedDate] || [];
  }

  addTask() {
    // Exemplo de método para adicionar tarefa
    const newTask = {
      time: '14:00-16:00', // Defina o tempo conforme necessário
      description: 'Nova Tarefa', // Defina a descrição conforme necessário
      color: this.taskColor, // Use a cor selecionada
    };

    if (this.selectedDate) {
      // Adiciona a nova tarefa ao dia selecionado
      if (!this.tasks[this.selectedDate]) {
        this.tasks[this.selectedDate] = [];
      }
      this.tasks[this.selectedDate].push(newTask);
      this.tasksForSelectedDate = this.tasks[this.selectedDate];
    }
  }

  deleteTask(taskToDelete: { time: string; description: string; color: string }) {
    if (this.selectedDate) {
      this.tasks[this.selectedDate] = this.tasks[this.selectedDate].filter(
        task => task !== taskToDelete
      );
      this.tasksForSelectedDate = this.tasks[this.selectedDate];
    }
  }
}
