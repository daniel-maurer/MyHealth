import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewTaskPage } from './new-task.page';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: NewTaskPage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [NewTaskPage]
})
export class NewTaskPageModule {}
