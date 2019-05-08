import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, LoadingController, NavController } from '@ionic/angular';

import 'rxjs/add/operator/first';

import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

import * as firebase from 'firebase/app';
import { CardService } from 'src/app/notifications/services/card.service';
import { Card } from 'src/app/notifications/models/card.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  public cards: Card[] = [,
    { id: 'allergy', title: 'Alergias', important: false, icon: 'heart-empty', position: 0 },
    { id: 'notes', title: 'Apontamentos', important: false, icon: 'heart-empty', position: 1 },
    { id: 'conditions', title: 'Condições', important: false, icon: 'heart-empty', position: 2 },
    { id: 'diets', title: 'Dietas', important: false, icon: 'heart-empty', position: 3 },
    { id: 'exercises', title: 'Exercícios', important: false, icon: 'heart-empty', position: 4 },
    { id: 'medicines', title: 'Medicamentos', important: false, icon: 'heart-empty', position: 5 },
    { id: 'weight', title: 'Peso', important: false, icon: 'heart-empty', position: 6 },
    { id: 'therapeutic-plans', title: 'Planos Terapeuticos', important: false, icon: 'heart-empty', position: 7 },
    { id: 'procedures', title: 'Procedimentos', important: false, icon: 'heart-empty', position: 8 }
  ];

  signupForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    private cardService: CardService,
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
            let newUser: User = formUser;
            newUser.isPatient = true;
            newUser.headline = 'O Melhor Paciente';

            newUser.createDate = firebase.database.ServerValue.TIMESTAMP;
            const uuid: string = firebase.auth().currentUser.uid;
            this.userService.create(newUser, uuid)
              .then(() => {

                //create standard cards
                this.cards.forEach((card: Card) => {
                  this.cardService.createWithSpecificId(card);
                });

                this.navCtrl.navigateForward('tabs');
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
