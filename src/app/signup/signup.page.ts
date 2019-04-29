import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, LoadingController, NavController, NavParams } from '@ionic/angular';

import 'rxjs/add/operator/first';

import { AuthService } from './../auth.service';
import { User } from './../user.model';
import { UserService } from './../user.service';
import { HomePage } from '../home/home.page';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public userService: UserService
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
      birthDate: ['', [Validators.required, Validators.nullValidator]],
      sex: ['', [Validators.required, Validators.nullValidator]],
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {

    this.showLoading();
    const formUser = this.signupForm.value;

    this.userService.userExists(formUser.username)
      .first()
      .subscribe((userExists: boolean) => {

        if (!userExists) {

          this.authService.createAuthUser({
            email: formUser.email,
            password: formUser.password
          }).then((authUser: firebase.User) => {

            delete formUser.password;
            const newUser: User = formUser;
            newUser.createDate = firebase.database.ServerValue.TIMESTAMP;
            let uuid: string = firebase.auth().currentUser.uid;
            this.userService.create(newUser, uuid)
              .then(() => {
                this.navCtrl.navigateForward('home');
                this.loadingCtrl.dismiss();
              }).catch((error: any) => {
                console.log(error);
                this.loadingCtrl.dismiss();
                this.showAlert(error);
              });

          }).catch((error: any) => {
            console.log(error);
            this.loadingCtrl.dismiss();
            this.showAlert(error);
          });

        } else {
          this.showAlert(`O username ${formUser.username} já está sendo usado em outra conta!`);
          this.loadingCtrl.dismiss();
        }
      });
  }

  showLoading(): any {
    return this.loadingCtrl.create({
      message: 'Por favor, espere...',
      spinner: 'dots'
    }).then((res) => {
      res.present();
    });
  }

  async showAlert(message: string) {
    const alert = await this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}
