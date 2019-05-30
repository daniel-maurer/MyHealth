import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CardHistoryPage } from './card-history.page';
import { CardOptionsPage } from '../card-options/card-options.page';

const routes: Routes = [
  {
    path: '',
    component: CardHistoryPage
  }
];

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RouterModule.forChild(routes)],
  declarations: [CardHistoryPage, CardOptionsPage],
  entryComponents: [CardOptionsPage]
})
export class CardHistoryPageModule {}
