import { MessagesPage } from './../messages/messages.page';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController } from '@ionic/angular';
import { InformationPage } from './../information/information.page';
import { NotificationsPage } from './../notifications/notifications.page';
import { ToDosPage } from '../to-dos/to-dos.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController) {
  }

  async onInformation() {
    const modal = await this.modalCtrl.create({
      component: InformationPage
    });
    return await modal.present();
  }

  onMessage(): void {
    this.navCtrl.navigateForward('messages');
  }

  onToDos(): void {
    this.navCtrl.navigateForward('to-dos');
  }

  async onNotification(ev) {
    const popover = await this.popoverCtrl.create({
      component: NotificationsPage,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
}
