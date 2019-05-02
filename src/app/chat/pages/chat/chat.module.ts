import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPage } from './chat.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageBoxComponent } from '../../components/message-box/message-box.component';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: ChatPage
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes), IonicModule],
  declarations: [ChatPage, MessageBoxComponent],
  exports: [MessageBoxComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatPageModule {}
