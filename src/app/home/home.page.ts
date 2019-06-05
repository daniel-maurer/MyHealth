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
import { Card } from '../cards/models/card.model';
import { CardService } from '../cards/services/card.service';
import { OrganizeCardsPage } from '../cards/pages/organize-cards/organize-cards.page';

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
    slidesPerView: this.platform.width() / 130,
    spaceBetween: 10,
    freeMode: true
  };

  constructor(
    private cardService: CardService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public userService: UserService,
    public tasksService: TaskService,
    public platform: Platform
  ) {}

  async ngOnInit(): Promise<void> {
    console.log('negoninit');
    this.userService.mapObjectKey<User>(this.userService.currentUser).subscribe((user: User) => {
      this.currentUser = user;
    });

    this.tasks$ = this.tasksService.getAll().map(tasks => {
      return tasks.filter(task => this.today(new Date(task.scheduled)) || this.isLate(task));
    });

    this.dones$ = this.tasksService.getAll().map(tasks => {
      return tasks.filter(task => this.today(new Date(task.scheduled)) && task.done);
    });

    this.cards$ = this.cardService.getAll().map(cards => {
      return cards.filter(card => card.visible);
    });

    this.setTasks();

  }

  setTasks(): void {
    this.tasks$.subscribe((tasks: Task[]) => {
      tasks.forEach((task: Task) => {

        if (task.prescriptionId) {
          this.cards$.subscribe((cards: Card[]) => {
            console.log('here3');
            if (cards.filter(p => p.id == task.prescriptionId)[0]) {
              console.log(cards.filter(p => p.id == task.prescriptionId)[0].title);
              task.prescriptionTitle = cards.filter(p => p.id == task.prescriptionId)[0].title;

              this.tasksService.update(task);
            }
          });
        }
      });
    });
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

    if (task.done) {
      task.completedDate = new Date(Date.now()).toISOString();
    } else {
      task.completedDate = '';
    }

    this.tasksService.update(task);
  }

  onToDos(): void {
    this.navCtrl.navigateForward('to-dos');
  }

  onOptions(): void {
    this.navCtrl.navigateForward('user-profile');
  }

  onCard(cardId: string, medicalPrescription: boolean): void {
    console.log(cardId);
    console.log(medicalPrescription);


    if (medicalPrescription) {
      this.navCtrl.navigateForward(['medical-prescription', cardId]);
    } else {
      this.navCtrl.navigateForward(['card-history', cardId]);
    }
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
