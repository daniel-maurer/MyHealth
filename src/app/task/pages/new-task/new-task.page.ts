import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { TaskService } from '../../services/task.service';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { User } from 'src/app/auth/models/user.model';
import { UserService } from 'src/app/auth/services/user.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss']
})
export class NewTaskPage implements OnInit {
  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private overlayService: OverlayService,
    private tasksService: TaskService,
    private userService: UserService
  ) {}
  taskForm: FormGroup;
  pageTitle = '...';
  buttonText = '...';
  taskId: string = undefined;
  currentUser: User;

  createdTask: FormGroup;

  startDate: string = 'Agendar';
  repeats: boolean = false;

  taskDates: any[] = [];

  ngOnInit(): void {
    this.userService.mapObjectKey<User>(this.userService.currentUser).subscribe((user: User) => {
      this.currentUser = user;
    });
    this.createForm();
    this.init();
  }

  init(): void {
    const taskId = this.route.snapshot.paramMap.get('id');
    if (!taskId) {
      this.pageTitle = 'Criar Tarefa';
      this.buttonText = 'Criar';
      return;
    }
    this.taskId = taskId;
    this.pageTitle = 'Editar Tarefa';
    this.buttonText = 'Salvar';
    this.tasksService
      .get(taskId)
      .pipe(take(1))
      .subscribe(({ title, done, scheduled }) => {
        this.taskForm.get('title').setValue(title);
        this.taskForm.get('done').setValue(done);
        this.taskForm.get('scheduled').setValue(scheduled);
      });
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false],
      startDate: ['', [Validators.required]],
      weekday: [''],
      scheduled: [''],
      endDate: [''],
      hour: ['']
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Salvando...'
    });

    try {
      // Set Hour if selected
      const scheduledDate = new Date(this.taskForm.get('startDate').value);
      const scheduledHour = new Date(this.taskForm.get('hour').value);
      const completeScheduled = this.getTimestamp(scheduledDate, scheduledHour);

      this.createdTask = this.fb.group({
        title: [this.taskForm.get('title').value],
        done: [false]
      });

      console.log(!this.taskId);
      const task = !this.taskId
        ? this.onCreateTask(completeScheduled)
        : await this.tasksService.update({
            id: this.taskId,
            completeScheduled,
            ...this.createdTask.value
          });
      this.navCtrl.navigateBack('/tabs');
    } catch (error) {
      console.log('Error saving Task: ', error);
      await this.overlayService.toast({
        message: error.message
      });

      console.log('error.message');
    } finally {
      loading.dismiss();
    }
  }

  async onCreateTask(scheduledDate: string): Promise<void> {
    if (this.repeats) {
      this.onScheduleSubmit();
      this.taskDates.forEach(date => {
        console.log(date);
        this.tasksService.create({
          source: this.currentUser.name,
          scheduled: date,
          ...this.createdTask.value
        });
      });
    } else {
      await this.tasksService.create({
        source: this.currentUser.name,
        scheduled: scheduledDate,
        ...this.createdTask.value
      });
    }
  }

  onRepeats() {
    this.repeats = !this.repeats;
    if (this.repeats) {
      this.startDate = 'Primeiro Dia';
    } else {
      this.startDate = 'Agendar';
    }
  }

  onScheduleSubmit(): void {
    this.setTaskDates(
      this.taskForm.get('weekday').value,
      this.taskForm.get('startDate').value,
      this.taskForm.get('endDate').value,
      this.taskForm.get('hour').value
    );

    console.log(this.taskDates);
  }

  setTaskDates(weekdays: string[], startDate: string, endDate: string, hour: string): void {
    this.taskDates = [];

    // Make month -1 because Date.UTC
    const start = new Date(startDate);

    let day: number = start.getDate();
    let month: number = start.getMonth();
    let year: number = start.getFullYear();

    const end = new Date(endDate);

    const endDay: number = end.getDate();
    const endMonth: number = end.getMonth();
    const endYear: number = end.getFullYear();

    const getWeekdayId: number[] = this.getWeekdaysId(weekdays);
    console.log(getWeekdayId);

    let isCorrectYear = false;
    let isCorrectMonth = false;

    while (!isCorrectYear) {
      if (year === endYear) {
        isCorrectYear = true;
      }
      while (!isCorrectMonth) {
        if (isCorrectYear && month === endMonth) {
          isCorrectMonth = true;
        }

        while (day <= 31) {
          if (isCorrectYear && isCorrectMonth && day > endDay) {
            break;
          }
          const date = new Date(Date.UTC(year, month, day));

          if (getWeekdayId.includes(date.getUTCDay())) {
            const hourDate = new Date(hour);
            this.taskDates.push(this.getTimestamp(date, hourDate));
          }
          if (day === 31) {
            day = 1;
            break;
          }
          day++;
        }
        if (month === 11) {
          month = 0;
          break;
        }
        month++;
      }
      year++;
    }
  }

  getTimestamp(date: Date, hour: Date): string {
    const day: number = date.getDate();
    const month: number = date.getMonth();
    const year: number = date.getFullYear();

    const stringMonth: string =
      month + 1 < 10 ? '0' + (month + 1).toString() : (month + 1).toString();
    const stringDay: string = day + 1 < 10 ? '0' + (day + 1).toString() : (day + 1).toString();

    return (
      year.toString() +
      '-' +
      stringMonth +
      '-' +
      stringDay +
      'T' +
      new Date(year, month, day, hour.getHours(), hour.getMinutes()).toLocaleTimeString() +
      '.000-03:00'
    );
  }

  getWeekdaysId(wekdays: string[]): number[] {
    let weekdayNumbers: number[] = [];

    if (wekdays.includes('Monday')) {
      weekdayNumbers.push(1);
    }

    if (wekdays.includes('Tuesday')) {
      weekdayNumbers.push(2);
    }

    if (wekdays.includes('Wednesday')) {
      weekdayNumbers.push(3);
    }

    if (wekdays.includes('Thursday')) {
      weekdayNumbers.push(4);
    }

    if (wekdays.includes('Friday')) {
      weekdayNumbers.push(5);
    }

    if (wekdays.includes('Saturday')) {
      weekdayNumbers.push(6);
    }

    if (wekdays.includes('Sunday')) {
      weekdayNumbers.push(0);
    }

    return weekdayNumbers;
  }
}
