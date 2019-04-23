import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})

export class NotificationPage {
constructor(public viewCtrl: ViewController) {}
close() {
    this.viewCtrl.dismiss();
  }
}