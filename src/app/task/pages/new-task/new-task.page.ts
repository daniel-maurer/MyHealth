import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.page.html',
  styleUrls: ['./new-task.page.scss'],
})
export class NewTaskPage implements OnInit {
  taskForm: FormGroup;
  pageTitle = '...';
  buttonText = '...';
  taskId: string = undefined;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private tasksService: TaskService
  ) {}

  ngOnInit(): void {
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
      .subscribe(({ title, done }) => {
        this.taskForm.get('title').setValue(title);
        this.taskForm.get('done').setValue(done);
      });
  }

  private createForm(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      done: [false]
    });
  }

  async onSubmit(): Promise<void> {
   // const loading = await this.overlayService.loading({
   //   message: 'Saving...'
   // });
    console.log('Saving...');
    try {
      const task = !this.taskId
        ? await this.tasksService.create(this.taskForm.value)
        : await this.tasksService.update({
            id: this.taskId,
            ...this.taskForm.value
          });
      this.navCtrl.navigateBack('/home');
    } catch (error) {
      console.log('Error saving Task: ', error);
     // await this.overlayService.toast({
    //    message: error.message
     // });

      console.log('error.message');
    } finally {
     // loading.dismiss();
    }
  }
}