import { Component, OnInit } from '@angular/core';

import { AlertController, MenuController, NavController } from '@ionic/angular';

import { AuthService } from './../auth.service';
import { SigninPage } from './../signin/signin.page';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss'],
})
export abstract class BaseComponent implements OnInit {

  protected navCtrl: NavController;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
 //   public app: App,
    public menuCtrl: MenuController
  ) {  }

  ngOnInit(): void {
  //  this.navCtrl = this.app.getActiveNavs();
}

  async onLogout() {
    const alert = await this.alertCtrl.create({
        message: 'Do you want to quit?',
        buttons: [
            {
                text: 'Yes',
                handler: () => {
                    this.authService.logout()
                        .then(() => {
                            //this.navCtrl.setRoot(SigninPage);
                            this.navCtrl.navigateForward('signin');
                            this.menuCtrl.enable(false, 'user-menu');
                        });
                }
            },
            {
                text: 'No'
            }
        ]
    });

    await alert.present();
}

}
