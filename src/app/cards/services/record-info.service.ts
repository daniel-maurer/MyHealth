import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { RecordInfo } from '../models/record-info.model';

@Injectable({
  providedIn: 'root'
})
export class RecordInfoService extends Firestore<RecordInfo> {
  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
   // this.init('procedures');
  }

  public init(com: string): void {
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/records/${com}/infos`);
        return;
      }
      this.setCollection(null);
    });
  }
}