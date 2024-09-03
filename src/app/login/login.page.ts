import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

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

  constructor(private navCtrl: NavController) { }

  login() {
    // Simula um login bem-sucedido e redireciona para a página principal das tabs
    this.navCtrl.navigateRoot('/tabs');
  }

  usernameType: string = 'text';
  passwordType: string = 'password';
  usernameIcon: string = 'eye-off';
  passwordIcon: string = 'eye-off';

  toggleUsernameVisibility() {
    this.usernameType = this.usernameType === 'text' ? 'password' : 'text';
    this.usernameIcon = this.usernameType === 'text' ? 'eye-off' : 'eye';
  }

  togglePasswordVisibility() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordType === 'text' ? 'eye-off' : 'eye';
  }
}

