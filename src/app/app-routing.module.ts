import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'chat/:recipientUser', loadChildren: './chat/pages/chat/chat.module#ChatPageModule' },
  { path: 'messages', loadChildren: './chat/pages/messages/messages.module#MessagesPageModule' },
  { path: 'signin', loadChildren: './auth/pages/signin/signin.module#SigninPageModule' },
  { path: 'signup', loadChildren: './auth/pages/signup/signup.module#SignupPageModule' },
  {
    path: 'user-profile',
    loadChildren: './auth/pages/user-profile/user-profile.module#UserProfilePageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
