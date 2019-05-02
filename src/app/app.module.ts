import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CapitalizePipe } from './chat/pipes/capitalize.pipe';
import { AngularFireModule, FirebaseAppConfig } from '@angular/fire';
import { CustomLoggedHeaderComponent } from './shared/components/custom-logged-header/custom-logged-header.component';
import { UserInfoComponent } from './shared/components/user-info/user-info.component';
import { UserMenuComponent } from './shared/components/user-menu/user-menu.component';
import { ProgressBarComponent } from './shared/components/progress-bar/progress-bar.component';
import { MessageBoxComponent } from './chat/components/message-box/message-box.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserService } from './auth/services/user.service';
import { MessageService } from './chat/services/message.service';
import { ChatService } from './chat/services/chat.service';
import { AuthService } from './core/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

const firebaseAppConfig: FirebaseAppConfig = {
  apiKey: 'AIzaSyBdGxWWveVlY0uHvVHLPjF9SgnEd1Be4Pg',
  authDomain: 'myhealthdb.firebaseapp.com',
  databaseURL: 'https://myhealthdb.firebaseio.com',
  storageBucket: 'myhealthdb.appspot.com'
};

@NgModule({
  declarations: [
    AppComponent,
    CapitalizePipe,
    CustomLoggedHeaderComponent,
    ProgressBarComponent,
    UserInfoComponent,
    UserMenuComponent,
    MessageBoxComponent
  ],
  entryComponents: [],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule
  ],
  providers: [
    AuthService,
    ChatService,
    MessageService,
    UserService,
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
