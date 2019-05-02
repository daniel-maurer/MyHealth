import { Component, OnInit, Input } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';

import { AuthService } from '../../../core/services/auth.service';
import { BaseComponent } from "../base/base.component";
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent extends BaseComponent{

  radioOpen: boolean;
  radioResult;

  @Input('user') currentUser: User;
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    //public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, menuCtrl);
  }

  onProfile(): void {
    this.navCtrl.navigateForward('user-profile');
  }

  onMyHealth(): void {
    this.navCtrl.navigateForward('home');
  }

}
