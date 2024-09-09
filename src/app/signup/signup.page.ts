import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  signupData = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private navCtrl: NavController, private toastController: ToastController) { }

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
    if (!this.signupData.name || !this.signupData.email || !this.signupData.password) {
      await this.presentToast('Preencha todos os campos.');
      return;
    }

    if (!this.isPasswordValid(this.signupData.password)) {
      await this.presentToast('A senha deve conter exatamente 7 caracteres numéricos.');
      return;
    }

    // Simula a autenticação do cadastro
    // Armazenar as informações do usuário no localStorage (ou pode ser uma chamada de API)
    localStorage.setItem('user', JSON.stringify(this.signupData));

    // Exibe uma mensagem de sucesso
    await this.presentToast('Cadastro realizado com sucesso!', 'success');

    // Redireciona o usuário para a tela de login
    this.navCtrl.navigateForward('/login');
  }

  isPasswordValid(password: string): boolean {
    const passwordPattern = /^[0-9]{7}$/; // Expressão regular para 7 dígitos numéricos
    return passwordPattern.test(password);
  }

}
