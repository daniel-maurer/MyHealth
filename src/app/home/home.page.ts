import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ModalController,
  PopoverController,
  LoadingController
} from '@ionic/angular';
import { User } from '../auth/models/user.model';
import { UserService } from '../auth/services/user.service';
import { Observable } from 'rxjs';
import { Task } from '../task/models/task.model';
import { TaskService } from '../task/services/task.service';
import { take } from 'rxjs/operators';
import { LoadingOptions } from '@ionic/core';
import { AuthProvider } from '../core/services/auth.types';
import { Card } from '../notifications/models/card.model';
import { CardService } from '../notifications/services/card.service';
import { OrganizeCardsPage } from '../notifications/pages/organize-cards/organize-cards.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  tasks$: Observable<Task[]>;
  cards$: Observable<Card[]>;
  currentUser: User;

  slideOpts = {
    // Default parameters for smallest screen
    slidesPerView: 1,
    spaceBetween: 10,
       centeredSlides: false,
    // Responsive breakpoints
    breakpointsInverse: true,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 0
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 40
      },
      850: {
        slidesPerView: 5,
        spaceBetween: 0
      },
      1000: {
        slidesPerView: 6,
        spaceBetween: 0
      },
      1368: {
        slidesPerView: 7,
        spaceBetween: 0
      }
    }
  };

  constructor(
    private cardService: CardService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public userService: UserService,
    public tasksService: TaskService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userService.mapObjectKey<User>(this.userService.currentUser).subscribe((user: User) => {
      console.log('await user');
      this.currentUser = user;
    });

    this.tasks$ = this.tasksService.getAll().map((tasks) => {
      console.log('map')
      return tasks.filter(task => task.done == false)
    });
    this.cards$ = this.cardService.getAll();
  }

  showLoading(): any {
    return this.loadingCtrl
      .create({
        message: 'Por favor, espere...',
        spinner: 'dots'
      })
      .then(res => {
        res.present();
      });
  }

  onMessage(): void {
    this.navCtrl.navigateForward('messages');
  }

  onUpdate(task: Task): void {
    task.done = !task.done;
    this.tasksService.update(task);
  }

  onToDos(): void {
    this.navCtrl.navigateForward('to-dos');
  }

  onOptions(): void {
    this.navCtrl.navigateForward('user-profile');
  }

  async onOrganizeCards() {
    const modal = await this.modalCtrl.create({
      component: OrganizeCardsPage
    //  componentProps: { value: 123 }
    });
    return await modal.present();
  }
}
