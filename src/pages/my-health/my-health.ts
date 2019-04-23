import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { InformationPage } from './../information/information';
import { NotificationPage } from './../notification/notification';
import { StatusBar } from '@ionic-native/status-bar';
import { ToDosPage } from '../to-dos/to-dos';

@Component({
  selector: 'page-my-health',
  templateUrl: 'my-health.html',
})
export class MyHealthPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
     public modalCtrl: ModalController,
     public popoverCtrl: PopoverController,
     private statusBar: StatusBar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyHealthPage');
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#f5f5f5');
  }

  ionViewDidEnter(){
    console.log('ionViewDidEnter MyHealthPage');
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#f5f5f5');
  }

  onInformation(): void {
    const modal = this.modalCtrl.create(InformationPage);
    modal.present();
  }

  onMessage(): void {
    this.navCtrl.push(HomePage);
  }

  onToDos(): void {
    this.navCtrl.push(ToDosPage);
  }

  onNotification(myEvent) {
    let popover = this.popoverCtrl.create(NotificationPage);
    let ev = {
      target : {
        getBoundingClientRect : () => {
          return {
            top: '10',
            left: '10',
            height: '50'
          };
        }
      }
    };
    
    popover.present({ev});
  }

}
