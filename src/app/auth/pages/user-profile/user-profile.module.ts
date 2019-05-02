import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { UserProfilePage } from './user-profile.page';
import { CustomLoggedHeaderComponent } from '../../../shared/components/custom-logged-header/custom-logged-header.component';
import { UserInfoComponent } from '../../../shared/components/user-info/user-info.component';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    CustomLoggedHeaderComponent,
    FormsModule,
    IonicModule,
    ProgressBarComponent,
    RouterModule.forChild(routes),
    UserInfoComponent
  ],
  declarations: [
    UserProfilePage,
    CustomLoggedHeaderComponent,
    ProgressBarComponent,
    UserInfoComponent
  ]
})
export class UserProfilePageModule {}
