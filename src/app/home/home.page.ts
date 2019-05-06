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

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  tasks$: Observable<Task[]>;
  currentUser: User;

  public cards = [
    { title: 'Alergias', subtitle: 'Subtitle' },
    { title: 'Altura', subtitle: 'Subtitle' },
    { title: 'Apontamentos', subtitle: 'Subtitle' },
    { title: 'Condições', subtitle: 'Subtitle' },
    { title: 'Dietas', subtitle: 'Subtitle' },
    { title: 'Exercícios', subtitle: 'Subtitle' },
    { title: 'Medicamentos', subtitle: 'Subtitle' },
    { title: 'Peso', subtitle: 'Subtitle' },
    { title: 'Plano Terapeutico', subtitle: 'Subtitle' },
    { title: 'Procedimentos', subtitle: 'Subtitle' }
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
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public userService: UserService,
    public tasksService: TaskService
  ) {}

  async ngOnInit(): Promise<void> {
    this.userService.mapObjectKey<User>(this.userService.currentUser).subscribe((user: User) => {
      console.log('await');
      this.currentUser = user;
    });

    this.tasks$ = this.tasksService.getAll().map(tasks => tasks.filter(task => task.done == false));
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
}
