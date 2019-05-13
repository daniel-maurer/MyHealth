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
import { Observable, scheduled } from 'rxjs';
import { Task } from '../task/models/task.model';
import { TaskService } from '../task/services/task.service';
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
  dones$: Observable<Task[]>;
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
      this.currentUser = user;
    });

    this.tasks$ = this.tasksService.getAll().map(tasks => {
      return tasks.filter(task => this.today(new Date(task.scheduled)) || this.isLate(task));
    });

    this.dones$ = this.tasksService.getAll().map(tasks => {
      return tasks.filter(task => this.today(new Date(task.scheduled)) && task.done);
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

  onCard(): void {
    this.navCtrl.navigateForward('card-history');
  }


  today(td) {
    const d = new Date();
    return (
      td.getDate() === d.getDate() &&
      td.getMonth() === d.getMonth() &&
      td.getFullYear() === d.getFullYear()
    );
  }

  isLate(task: Task) {
    const today = new Date();
    const td = new Date(task.scheduled);
    return td < today && !task.done;
  }

  async onOrganizeCards() {
    const modal = await this.modalCtrl.create({
      component: OrganizeCardsPage
    });
    return await modal.present();
  }
}
