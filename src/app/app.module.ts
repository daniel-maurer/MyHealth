import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireModule, AuthMethods, AuthProviders, FirebaseAppConfig } from 'angularfire2';

import { AddClassPage } from './../pages/add-class/add-class';
import { AuthService } from './../providers/auth.service';
import { CapitalizePipe } from './../pipes/capitalize.pipe';
import { ChatPage } from './../pages/chat/chat';
import { ChatService } from './../providers/chat.service';
import { ClassesPage } from './../pages/classes/classes';
import { ClassService } from './../providers/class.service';
import { CustomLoggedHeaderComponent } from './../components/custom-logged-header/custom-logged-header.component';
import { EditClassPage } from './../pages/edit-class/edit-class';
import { EditLessonPage } from './../pages/edit-lesson/edit-lesson';
import { InformationPage } from './../pages/information/information';
import { NotificationPage } from './../pages/notification/notification';
import { MessageBoxComponent } from './../components/message-box/message-box.component';
import { MessageService } from './../providers/message.service';
import { HomePage } from '../pages/home/home';
import { LessonService } from "../providers/lesson.service";
import { LessonPage } from './../pages/lesson/lesson';
import { MyApp } from './app.component';
import { MyHealthPage } from './../pages/my-health/my-health';
import { ProgressBarComponent } from './../components/progress-bar/progress-bar.component';
import { SchedulePage } from './../pages/schedule/schedule';
import { SigninPage } from './../pages/signin/signin';
import { SignupPage } from './../pages/signup/signup';
import { UserInfoComponent } from './../components/user-info/user-info.component';
import { UserMenuComponent } from './../components/user-menu/user-menu.component';
import { UserProfilePage } from './../pages/user-profile/user-profile';
import { UserService } from './../providers/user.service';
import { SelectClassesPage } from './../pages/select-classes/select-classes';
import { ToDosPage } from '../pages/to-dos/to-dos';

const firebaseAppConfig: FirebaseAppConfig = {
   // apiKey: "AIzaSyBHOi0nJETBKQ7XCqSw-e2SeWra49tPIwc",
  //  authDomain: "dolphin-a6820.firebaseapp.com",
  //  databaseURL: "https://dolphin-a6820.firebaseio.com",
  //  storageBucket: "dolphin-a6820.appspot.com"

    apiKey: "AIzaSyBdGxWWveVlY0uHvVHLPjF9SgnEd1Be4Pg",
    authDomain: "myhealthdb.firebaseapp.com",
    databaseURL: "https://myhealthdb.firebaseio.com",
    storageBucket: "myhealthdb.appspot.com",
};

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    AddClassPage,
    CapitalizePipe,
    ChatPage,
    ClassesPage,
    CustomLoggedHeaderComponent,
    EditClassPage,
    EditLessonPage,
    HomePage,
    InformationPage,
    LessonPage,
    MessageBoxComponent,
    MyApp,
    MyHealthPage,
    NotificationPage,
    ProgressBarComponent,
    SchedulePage,
    SelectClassesPage,
    SigninPage,
    SignupPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage,
    ToDosPage,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseAppConfig, firebaseAuthConfig),
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, { mode: 'md' })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AddClassPage,
    ChatPage,
    ClassesPage,
    EditClassPage,
    EditLessonPage,
    HomePage,
    InformationPage,
    LessonPage,
    MyApp,
    MyHealthPage,
    NotificationPage,
    SchedulePage,
    SelectClassesPage,
    SigninPage,
    SignupPage,
    UserProfilePage,
    ToDosPage
  ],
  providers: [
    AuthService,
    ChatService,
    ClassService,
    LessonService,
    MessageService,
    StatusBar,
    SplashScreen,
    UserService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
