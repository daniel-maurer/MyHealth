import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'tabs/home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'chat/:recipientUser', loadChildren: './chat/pages/chat/chat.module#ChatPageModule' },
  {
    path: 'tabs/messages',
    loadChildren: './chat/pages/messages/messages.module#MessagesPageModule'
  },
  {
    path: 'messages',
    loadChildren: './chat/pages/messages/messages.module#MessagesPageModule'
  },
  { path: 'signin', loadChildren: './auth/pages/signin/signin.module#SigninPageModule' },
  { path: 'signup', loadChildren: './auth/pages/signup/signup.module#SignupPageModule' },
  {
    path: 'user-profile',
    loadChildren: './auth/pages/user-profile/user-profile.module#UserProfilePageModule'
  },
  {
    path: 'tabs/user-profile',
    loadChildren: './auth/pages/user-profile/user-profile.module#UserProfilePageModule'
  },
  { path: 'tasks', loadChildren: './task/task.module#TasksModule' },
  { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
