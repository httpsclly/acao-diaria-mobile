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
}
