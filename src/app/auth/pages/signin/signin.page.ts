import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {

  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
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
          //this.navCtrl.setRoot(HomePage);
          this.navCtrl.navigateForward('tabs');
          //loading.dismiss();
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
    //this.navCtrl.setRoot(MyHealthPage);
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
