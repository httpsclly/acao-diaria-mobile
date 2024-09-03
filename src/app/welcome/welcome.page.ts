import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {

  constructor(private navCtrl: NavController) { }

  goToLogin() {
    // Navegar para a página de login apenas quando o botão for clicado
    this.navCtrl.navigateForward('/login');
  }

}
