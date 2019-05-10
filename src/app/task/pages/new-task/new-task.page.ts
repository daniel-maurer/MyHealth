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

  scheduleForm: FormGroup;
  startDate: string = "Agendar";
  repeats: boolean = false;

    taskDates: any[] = [];

  ngOnInit(): void {
    this.userService.mapObjectKey<User>(this.userService.currentUser).subscribe((user: User) => {
      this.currentUser = user;
    });
    this.createForm();
    this.createScheduleForm();
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
      scheduled: ['', [Validators.required]]
    });
  }

  private createScheduleForm(): void {
    this.scheduleForm = this.fb.group({
      weekday: [''],
      startDate: ['', [Validators.required, Validators.minLength(3)]],
      endDate: [''],
      hour: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  async onSubmit(): Promise<void> {
    const loading = await this.overlayService.loading({
      message: 'Saving...'
    });
    console.log('Saving...');
    try {
      const task = !this.taskId
        ? await this.tasksService.create({
            source: this.currentUser.name,
            ...this.taskForm.value
          })
        : await this.tasksService.update({
            id: this.taskId,
            ...this.taskForm.value
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

  onRepeats() {
    this.repeats = !this.repeats;
    if(this.repeats)
    {
      this.startDate = "Primeiro Dia"
    }
    else
    {
      this.startDate = "Agendar"
    }
  }

  onScheduleSubmit(): void {

    console.log(this.scheduleForm.get("weekday").value);
    console.log(this.scheduleForm.get("startDate").value);
    console.log(this.scheduleForm.get("endDate").value);
    console.log(this.scheduleForm.get("hour").value);

      this.setTaskDates(
        this.scheduleForm.get("weekday").value,
        this.scheduleForm.get("startDate").value,
        this.scheduleForm.get("endDate").value,
        this.scheduleForm.get("hour").value
      );

      console.log(this.taskDates);
    }



    setTaskDates(weekdays: string[], startDate: string, endDate: string, hour: string): void {
    this.taskDates = [];

    // Make month -1 because Date.UTC
    const start = new Date(startDate);

    let day: number = start.getDate();
    let month: number = start.getMonth() - 1;
    let year: number = start.getFullYear();

    const end = new Date(endDate);

    const endDay: number = end.getDate();
    const endMonth: number = end.getMonth() - 1;
    const endYear: number = end.getFullYear();

    const getWeekdayId: number[] = this.getWeekdaysId(weekdays);

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
            const stringMonth: string = (month + 1) < 10 ? '0' + (month + 1).toString() : (month + 1).toString();
            const stringDay: string = day < 10 ? '0' + day.toString() : day.toString();

            const hourDate = new Date(hour);

            this.taskDates.push(new Date(
              year,
              Number(stringMonth),
              Number(stringDay),
              hourDate.getHours(),
              hourDate.getMinutes()));
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
