import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BaseService } from "./base.service";
import { Message } from './message.model';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class MessageService extends BaseService {

  constructor(
    public db: AngularFireDatabase,
    public http: Http
  ) {
    super();
  }

  create(message: Message, listMessages: AngularFireList<Message>): Promise<firebase.database.Reference> {
    return Promise.resolve(listMessages.push(message));
  }

  getMessages(userId1: string, userId2: string): AngularFireList<Message> {    
    console.log(userId1, userId2);
    
    return this.db.list(`/messages/${userId1}-${userId2}`, 
      (ref: firebase.database.Reference) => ref.limitToLast(30).orderByChild('timestamp')
    );
  }
}

