import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';

import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../models/user.model';
import { UserService } from '../../services/user.service';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  currentUser: User;
  canEdit: boolean = false;
  uploadProgress: number;
  private filePhoto: File;

  constructor(
    public authService: AuthService,
    public navCtrl: NavController,
    //public navParams: NavParams,
    public userService: UserService
  ) {  }


  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ngOnInit() {
    this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .subscribe((user: User) => {
        this.currentUser = user;
      });
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    if (this.filePhoto) {

      let uploadTask = this.userService.uploadPhoto(this.filePhoto, this.currentUser.$key);

      uploadTask.on('state_changed', (snapshot: firebase.storage.UploadTaskSnapshot) => {

        this.uploadProgress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);

      }, (error: Error) => {
        // catch error
      });

      uploadTask.then((UploadTaskSnapshot: firebase.storage.UploadTaskSnapshot) => {
        this.editUser(uploadTask.snapshot.downloadURL);
      });

    } else {
      this.editUser();
    }

  }

  onPhoto(event): void {
    this.filePhoto = event.target.files[0];
  }

  private editUser(photoUrl?: string): void {
    this.userService
      .edit({
        name: this.currentUser.name,
        username: this.currentUser.username,
        photo: photoUrl || this.currentUser.photo || ''
      }).then(() => {
        this.canEdit = false;
        this.filePhoto = undefined;
        this.uploadProgress = 0;
      });
  }
}
