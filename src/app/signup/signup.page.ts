import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { UserService } from '../user.service'; // Corrigir o caminho se necessário

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  signupData = {
    username: '',
    email: '',
    senha: ''
  };

  constructor(
    private navCtrl: NavController, 
    private toastController: ToastController,
    private userService: UserService // Injetar o serviço
  ) { }

  // Função para exibir um toast
  async presentToast(message: string, color: string = 'danger') {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000, // Duração em milissegundos
      color: color, // Cor do toast
      position: 'top', // Posição do toast
      cssClass: 'toast-message' // Classe CSS opcional para estilização
    });

    await toast.present();
  }

  async register() {
    if (!this.signupData.username || !this.signupData.email || !this.signupData.senha) {
      await this.presentToast('Preencha todos os campos.');
      return;
    }

    if (!this.isPasswordValid(this.signupData.senha)) {
      await this.presentToast('A senha deve conter exatamente 7 caracteres numéricos.');
      return;
    }

    try {
      // Enviar os dados para o backend usando o serviço
      const response = await this.userService.register(this.signupData).toPromise();
      
      // Exibe uma mensagem de sucesso
      await this.presentToast('Cadastro realizado com sucesso!', 'success');

      // Redireciona o usuário para a tela de login
      this.navCtrl.navigateForward('/login');
    } catch (error) {
      // Exibe uma mensagem de erro
      await this.presentToast('Erro ao realizar o cadastro. Tente novamente.');
      console.error('Erro ao registrar usuário', error);
    }
  }

  isPasswordValid(password: string): boolean {
    const passwordPattern = /^[0-9]{7}$/; // Expressão regular para 7 dígitos numéricos
    return passwordPattern.test(password);
  }

}
