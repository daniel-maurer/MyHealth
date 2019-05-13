import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Record } from '../models/record.model';

@Injectable({
  providedIn: 'root'
})
export class RecordService extends Firestore<Record> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/records`, ref => ref.orderBy('date', 'asc'));
        return;
      }
      this.setCollection(null);
    });
  }
}
