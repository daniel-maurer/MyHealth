import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: '../home/home.module#HomePageModule'
          }
        ]
      },
      {
        path: 'history',
        children: [
          {
            path: '',
            loadChildren: '../cards/pages/card-history/card-history.module#CardHistoryPageModule'
          }
        ]
      },
      {
        path: 'messages',
        children: [
          {
            path: '',
            loadChildren: '../chat/pages/messages/messages.module#MessagesPageModule'
          }
        ]
      },
      {
        path: 'user-profile',
        children: [
          {
            path: '',
            loadChildren: '../auth/pages/user-profile/user-profile.module#UserProfilePageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
