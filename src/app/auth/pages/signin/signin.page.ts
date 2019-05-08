import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';
import { Card } from 'src/app/notifications/models/card.model';
import { CardService } from 'src/app/notifications/services/card.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  signinForm: FormGroup;

  public cards: Card[] = [,
    { id: 'allergy', title: 'Alergias', important: false, icon: 'heart-empty', position: 0 },
    { id: 'notes', title: 'Apontamentos', important: false, icon: 'heart-empty', position: 1 },
    { id: 'conditions', title: 'Condições', important: true, icon: 'heart-empty', position: 2 },
    { id: 'diets', title: 'Dietas', important: false, icon: 'heart-empty', position: 3 },
    { id: 'exercises', title: 'Exercícios', important: false, icon: 'heart-empty', position: 4 },
    { id: 'medicines', title: 'Medicamentos', important: false, icon: 'heart-empty', position: 5 },
    { id: 'weight', title: 'Peso', important: false, icon: 'heart-empty', position: 6 },
    { id: 'therapeutic-plans', title: 'Planos Terapeuticos', important: false, icon: 'heart-empty', position: 7 },
    { id: 'procedures', title: 'Procedimentos', important: false, icon: 'heart-empty', position: 8 }
  ];

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    private cardService: CardService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController
  ) {
    let emailRegex = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.signinForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {

    this.showLoading();

    this.authService.signinWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {

        if (isLogged) {
          //create standard cards
          this.cards.forEach((card: Card) => {
            this.cardService.createWithSpecificId(card);
          });

          this.navCtrl.navigateForward('tabs');
          this.loadingCtrl.dismiss();
        }

      }).catch((error: any) => {
        console.log(error);
        //loading.dismiss();
        this.loadingCtrl.dismiss();
        this.showAlert(error);
      });
  }

  onSignup(): void {
    this.navCtrl.navigateForward('signup');
  }

  onHome(): void {

    //create standard cards
    this.cards.forEach((card: Card) => {
      this.cardService.createWithSpecificId(card);
    });
    this.navCtrl.navigateForward('tabs');
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
