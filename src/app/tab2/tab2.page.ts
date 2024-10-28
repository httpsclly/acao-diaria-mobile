import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  selectedDate: string | null = null;

  // Estrutura para armazenar as tarefas com a cor e outros campos
  tasks: { [key: string]: { time: string; title: string; color: string }[] } = {};
  tasksForSelectedDate: { time: string; title: string; color: string }[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    this.userService.getTasks().subscribe(
      (tasks) => {
        this.tasks = this.groupTasksByDate(tasks);
      },
      (error) => {
        console.error('Erro ao carregar tarefas do backend:', error);
      }
    );
  }

  groupTasksByDate(tasks: any[]): { [key: string]: { time: string; title: string; color: string }[] } {
    const groupedTasks: { [key: string]: { time: string; title: string; color: string }[] } = {};

    tasks.forEach(task => {
      const date = task.start_time.split('T')[0]; // Obtém a data no formato 'yyyy-MM-dd'
      const time = `${task.start_time.split('T')[1].substring(0, 5)}-${task.end_time.split('T')[1].substring(0, 5)}`; // Formata o horário
      const title = task.title; // Usa o título da tarefa
      const color = task.color || '#ffcccc'; // Usa a cor do backend ou uma cor padrão

      if (!groupedTasks[date]) {
        groupedTasks[date] = [];
      }

      groupedTasks[date].push({ time, title, color });
    });

    return groupedTasks;
  }

  onDateSelected(event: any) {
    const selectedDate = event.detail.value.split('T')[0]; // Obtém a data no formato 'yyyy-MM-dd'
    this.selectedDate = selectedDate;
    this.tasksForSelectedDate = this.tasks[selectedDate] || [];
  }

  addTask() {
    // Exemplo de método para adicionar tarefa
    const newTask = {
      time: '14:00-16:00', // Defina o tempo conforme necessário
      title: 'Nova Tarefa', // Defina o título conforme necessário
      color: '#ffcccc', // Use uma cor padrão ou defina uma lógica para cores
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

  deleteTask(taskToDelete: { time: string; title: string; color: string }) {
    if (this.selectedDate) {
      this.tasks[this.selectedDate] = this.tasks[this.selectedDate].filter(
        task => task !== taskToDelete
      );
      this.tasksForSelectedDate = this.tasks[this.selectedDate];
    }
  }
}
