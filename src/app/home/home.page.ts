import { MessagesPage } from '../chat/pages/messages/messages.page';
import { Component, HostListener, ViewChild } from '@angular/core';
import {
  NavController,
  NavParams,
  ModalController,
  PopoverController,
  IonContent
} from '@ionic/angular';
import { User } from '../auth/models/user.model';
import { UserService } from '../auth/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  currentUser: User;

  @ViewChild(IonContent) content: IonContent;

  form = [
    { val: 'Caminhar 15 min', isChecked: true },
    { val: 'Medir glicose', isChecked: false },
    { val: 'Cardiologista as 17h', isChecked: false },
    { val: 'Teste1', isChecked: false },
    { val: 'Teste2', isChecked: false }
  ];

  slideOpts = {
    // Default parameters for smallest screen
    slidesPerView: 1,
    spaceBetween: 10,
    centeredSlides: true,
    // Responsive breakpoints
    breakpointsInverse: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: -20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 40
      }
    }
  };

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public userService: UserService
  ) {
    this.userService.mapObjectKey<User>(this.userService.currentUser).subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.userService.mapObjectKey<User>(this.userService.currentUser).subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  onMessage(): void {
    this.navCtrl.navigateForward('messages');
  }


  onToDos(): void {
    this.navCtrl.navigateForward('to-dos');
  }

  logScrollStart() {
    console.log('logScrollStart : When Scroll Starts');
  }

  logScrolling() {
    console.log('logScrolling : When Scrolling');
  }

  logScrollEnd() {
    console.log('logScrollEnd : When Scroll Ends');
  }
}
