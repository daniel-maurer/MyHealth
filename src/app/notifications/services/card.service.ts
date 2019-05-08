import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Card } from '../models/card.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CardService extends Firestore<Card>{

  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
   }

   private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/cards`, ref =>
          ref.orderBy('position', 'asc')
        );
        return;
      }
      this.setCollection(null);
    });
  }
}
