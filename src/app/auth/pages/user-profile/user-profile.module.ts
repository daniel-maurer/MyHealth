import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfilePage } from './user-profile.page';
//import { CustomLoggedHeaderComponent } from '../../../shared/components/custom-logged-header/custom-logged-header.component';
//import { UserInfoComponent } from '../../../shared/components/user-info/user-info.component';
//import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: UserProfilePage
  }
];

@NgModule({
  imports: [
    SharedModule,
   // CustomLoggedHeaderComponent,
  //  ProgressBarComponent,
    RouterModule.forChild(routes),
  //  UserInfoComponent
  ],
  declarations: [
    UserProfilePage
 //   CustomLoggedHeaderComponent,
   // ProgressBarComponent,
  //  UserInfoComponent
  ]
})
export class UserProfilePageModule {}
