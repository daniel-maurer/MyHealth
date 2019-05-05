import { MessagesPage } from '../chat/pages/messages/messages.page';
import { Component, HostListener, ViewChild, OnInit } from '@angular/core';
import {
  NavController,
  NavParams,
  ModalController,
  PopoverController,
  IonContent
} from '@ionic/angular';
import { User } from '../auth/models/user.model';
import { UserService } from '../auth/services/user.service';
import { Observable } from 'rxjs';
import { Task } from '../task/models/task.model';
import { TaskService } from '../task/services/task.service';
import { take } from 'rxjs/operators';

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
      }
    }
  };

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public userService: UserService,
    public tasksService: TaskService
  ) {
    this.userService.mapObjectKey<User>(this.userService.currentUser).subscribe((user: User) => {
      this.currentUser = user;
    });
  }

  async ngOnInit() {
    this.userService.mapObjectKey<User>(this.userService.currentUser).subscribe((user: User) => {
      this.currentUser = user;
    });

    this.tasks$ = await this.tasksService.getAll().map(tasks => 
      tasks.filter(task => task.done == false));
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
