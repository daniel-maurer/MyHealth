import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';
import { SharedModule } from '../shared/shared.module';
import { OrganizeCardsPage } from '../cards/pages/organize-cards/organize-cards.page';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage, OrganizeCardsPage],
  entryComponents: [OrganizeCardsPage],
})
export class HomePageModule {}
