import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AngularFireAuth } from "@angular/fire/auth";
import { BaseService } from "../../core/services/base.service";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  constructor(
    public afAuth: AngularFireAuth,
    public http: Http
  ) {
    super();
  }

  createAuthUser(user: {email: string, password: string}): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
      .catch(this.handlePromiseError);
  }

  signinWithEmail(user: {email: string, password: string}): Promise<boolean> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
      .then((authUser) => {
        return authUser != null;
      }).catch(this.handlePromiseError);
  }

  logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  get authenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .authState
        .subscribe((authUser: firebase.User) => {
          (authUser) ? resolve(true) : reject(false);
        });
    });
  }

}
