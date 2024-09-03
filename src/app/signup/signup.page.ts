import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

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

  constructor(private navCtrl: NavController) { }

  register() {
    // Simula a autenticação do cadastro
    if (this.signupData.email && this.signupData.password) {
      // Armazenar as informações do usuário no localStorage (ou pode ser uma chamada de API)
      localStorage.setItem('user', JSON.stringify(this.signupData));

      // Exibe uma mensagem de sucesso
      console.log('Cadastro realizado com sucesso!');

      // Redireciona o usuário para a tela de login
      this.navCtrl.navigateForward('/login');
    } else {
      // Exibe uma mensagem de erro se os campos não estiverem preenchidos
      console.log('Preencha todos os campos.');
    }
  }
}
