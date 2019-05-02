import { Component, OnInit, Input } from '@angular/core';

import { AlertController, MenuController } from '@ionic/angular';

import { AuthService } from "../../../core/services/auth.service";
import { BaseComponent } from "../base/base.component";
import { User } from '../../../auth/models/user.model';

@Component({
  selector: 'app-custom-logged-header',
  templateUrl: './custom-logged-header.component.html',
  styleUrls: ['./custom-logged-header.component.scss'],
})
export class CustomLoggedHeaderComponent extends BaseComponent {

  @Input() title: string;
  @Input() user: User;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
   // public app: App,
    public menuCtrl: MenuController
  ) {
    super(alertCtrl, authService, menuCtrl);
  }

}
