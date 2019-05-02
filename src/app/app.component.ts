import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './auth/models/user.model';
import { SigninPage } from './auth/pages/signin/signin.page';
import { AuthService } from './core/services/auth.service';
import { UserService } from './auth/services/user.service';
import { HomePage } from './home/home.page';
import * as firebase from 'firebase/app';



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  rootPage:any = SigninPage;
  currentUser: User;

  constructor(
    authService: AuthService,
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    userService: UserService
  ) {
    authService
      .afAuth
      .authState
      .subscribe((authUser: firebase.User) => {

        if (authUser) {

          this.rootPage = HomePage;

          userService.currentUser
            .valueChanges()
            .subscribe((user: User) => {
              this.currentUser = user;
            });

        } else {

          this.rootPage = SigninPage;

        }

      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
