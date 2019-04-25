import { Component, Input } from '@angular/core';
import { AlertController, App, MenuController } from 'ionic-angular';

import { AuthService } from './../../providers/auth.service';
import { BaseComponent } from "../base.component";
import { User } from './../../models/user.model';
import { UserProfilePage } from './../../pages/user-profile/user-profile';
import { MyHealthPage } from './../../pages/my-health/my-health';


@Component({
  selector: 'user-menu',
  templateUrl: 'user-menu.component.html'
})
export class UserMenuComponent extends BaseComponent {

radioOpen: boolean;
radioResult;

  @Input('user') currentUser: User;
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, app, menuCtrl);
  }

  onProfile(): void {
    this.navCtrl.push(UserProfilePage);
  }

  onMyHealth(): void {
    this.navCtrl.push(MyHealthPage);
  }
}
