import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

interface Action {
  name: string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  user = {
    name: '',
    profileImage: '',
    availableActions: [] as Action[],
    excludedActions: [] as Action[],
  };

  taskCount = 0; // Quantidade de tarefas disponíveis
  excludedTaskCount = 0; // Quantidade de tarefas excluídas
  showAvailableActions = false;
  showExcludedActions = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
    this.loadTaskCounts();
  }

  // Carrega os dados do usuário e das tarefas
  loadUserData() {
    this.userService.getUserProfile().subscribe(
      (data: any) => {
        this.user.name = data.name;
        this.user.profileImage = data.profileImage;
        this.user.availableActions = data.availableActions || [];
        this.user.excludedActions = data.excludedActions || [];
      },
      (error) => {
        console.error('Erro ao carregar dados do usuário:', error);
      }
    );
  }

  loadTaskCounts() {
    // Conta as tarefas disponíveis e excluídas
    this.userService.getTaskCounts().subscribe(
      (data: any) => {
        this.taskCount = data.availableTaskCount;
        this.excludedTaskCount = data.excludedTaskCount;
      },
      (error) => {
        console.error('Erro ao carregar contagem de tarefas:', error);
      }
    );
  }

  // Alterna a exibição das ações disponíveis
  toggleAvailableActions() {
    this.showAvailableActions = !this.showAvailableActions;
    this.showExcludedActions = false;
  }

  // Alterna a exibição das ações excluídas
  toggleExcludedActions() {
    this.showExcludedActions = !this.showExcludedActions;
    this.showAvailableActions = false;
  }

  async alterarImagemPerfil() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      });

      if (image && image.base64String) {
        this.user.profileImage = `data:image/jpeg;base64,${image.base64String}`;
        this.userService.updateUserProfileImage(this.user.profileImage).subscribe(
          () => {
            console.log('Imagem de perfil atualizada com sucesso.');
          },
          (error) => {
            console.error('Erro ao atualizar a imagem de perfil:', error);
          }
        );
      }
    } catch (error) {
      console.error('Erro ao selecionar imagem:', error);
    }
  }

  alterarNomeConta() {
    // Lógica para alterar o nome da conta
  }

  alterarSenha() {
    // Lógica para alterar a senha
  }

  sair() {
    this.router.navigate(['/login']);
  }
}
