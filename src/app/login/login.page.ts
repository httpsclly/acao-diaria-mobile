import { Component } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  loginData = {
    email: '',
    password: ''
  };

  constructor(private navCtrl: NavController, private alertController: AlertController) { }

  // Função para alternar a visibilidade da senha
  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'password' ? 'text' : 'password';
    this.passwordIcon = this.passwordType === 'password' ? 'eye-off' : 'eye';
  }

  // Função para validar a senha
  isPasswordValid(password: string): boolean {
    const passwordPattern = /^[0-9]{7}$/; // Expressão regular para 7 dígitos numéricos
    return passwordPattern.test(password);
  }

  // Função para validar o email
  isEmailValid(email: string): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expressão regular para validação de email
    return emailPattern.test(email);
  }

  // Função para exibir um alerta
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Erro',
      message: message,
      buttons: ['OK'],
      cssClass: 'alert-message' // Adiciona a classe de estilo ao alerta
    });

    await alert.present();
  }

  // Função de login
  async login() {
    // Verificar se o email e a senha são válidos
    if (!this.isEmailValid(this.loginData.email)) {
      await this.presentAlert('As credenciais estão incorretas, tente novamente.');
      return;
    }

    if (!this.isPasswordValid(this.loginData.password)) {
      await this.presentAlert('A senha deve conter exatamente 7 caracteres numéricos.');
      return;
    }

    this.navCtrl.navigateRoot('/tabs');
  }

  // Controle de visibilidade da senha
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
}