import { Component, OnInit } from '@angular/core';
import {
  NavController,
  ModalController,
  PopoverController,
  LoadingController,
  Platform
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
    slidesPerView: this.platform.width() / 110,
    spaceBetween: 10,
    freeMode: true
  };

  constructor(
    private cardService: CardService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public userService: UserService,
    public tasksService: TaskService,
    public platform: Platform
  ) {}

  async ngOnInit(): Promise<void> {
    this.userService.mapObjectKey<User>(this.userService.currentUser).subscribe((user: User) => {
      console.log('await user');
      this.currentUser = user;
    });

    this.tasks$ = this.tasksService.getAll().map(tasks => {
      console.log('map');
      return tasks.filter(task => task.done == false);
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
    });
    return await modal.present();
  }
}
