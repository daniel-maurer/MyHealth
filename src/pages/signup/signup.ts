import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, Loading, LoadingController, NavController, NavParams } from 'ionic-angular';

import 'rxjs/add/operator/first';

import { AuthService } from './../../providers/auth.service';
import { User } from './../../models/user.model';
import { UserService } from './../../providers/user.service';
import { MyHealthPage } from '../my-health/my-health';

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public userService: UserService
  ) {

    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      accountType: ['', [Validators.required, Validators.nullValidator]],
      country: ['', [Validators.required, Validators.nullValidator]],
      birthDate: ['', [Validators.required, Validators.nullValidator]],
      sex: ['', [Validators.required, Validators.nullValidator]],
    });

  }

  onSubmit(): void {

    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    
    this.userService.userExists(formUser.username)
      .first()
      .subscribe((userExists: boolean) => {

        if (!userExists) {

          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authUser: firebase.User) => {

            delete formUser.password;
            let newUser: User = formUser;
            newUser.createDate = firebase.database.ServerValue.TIMESTAMP;
            let uuid: string = authUser.uid;

            this.userService.create(newUser, uuid)
              .then(() => {
                console.log('Usuario cadastrado!');
                this.navCtrl.setRoot(MyHealthPage);
                loading.dismiss();
              }).catch((error: any) => {
                console.log(error);
                loading.dismiss();
                this.showAlert(error);
              });

          }).catch((error: any) => {
            console.log(error);
            loading.dismiss();
            this.showAlert(error);
          });

        } else {

          this.showAlert(`O username ${formUser.username} já está sendo usado em outra conta!`);
          loading.dismiss();

        }

      });

  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}
