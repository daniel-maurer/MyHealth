import { MessagesPage } from './../messages/messages.page';
import { Component, HostListener, ViewChild } from '@angular/core';
import { NavController, NavParams, ModalController, PopoverController, IonContent } from '@ionic/angular';
import { InformationPage } from './../information/information.page';
import { NotificationsPage } from './../notifications/notifications.page';
import { ToDosPage } from '../to-dos/to-dos.page';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  currentUser: User;

  @ViewChild(IonContent) content: IonContent;

  slideOpts2 = {
    initialSlide: 1,
    slidesPerView: 2,
    //slidesPerView: 'auto',
    spaceBetween: -20,
    speed: 400,
    centeredSlides: true
    //  showPaginate:  false
  };

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
}

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

  onResize(event) {
    // let slidesPerView = Math.round($(window).width() / 110);
    // if (slidesPerView < 3) {
    //   slidesPerView = 3;
    ///  }
    ///  console.log(slidesPerView);
    ///  this.slideOpts.slidesPerView = slidesPerView;
    // swiper.onResize();
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

  logScrollStart(){
    console.log("logScrollStart : When Scroll Starts");
  }

  logScrolling(){
    console.log("logScrolling : When Scrolling");
  }

  logScrollEnd(){
    console.log("logScrollEnd : When Scroll Ends");
  }
}
