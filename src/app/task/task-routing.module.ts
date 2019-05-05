import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        loadChildren: './pages/new-task/new-task.module#NewTaskPageModule'
      },
      {
        path: 'edit/:id',
        loadChildren: './pages/new-task/new-task.module#NewTaskPageModule'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule {}