import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent, NavController, NavParams } from '@ionic/angular';

import { AngularFireList, AngularFireObject } from '@angular/fire/database';

import { AuthService } from '../../../core/services/auth.service';
import { Chat } from '../../models/chat.model';
import { ChatService } from '../../services/chat.service';
import { Message } from '../../models/message.model';
import { MessageService } from '../../services/message.service';
import { User } from '../../../auth/models/user.model';
import { UserService } from '../../../auth/services/user.service';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  @ViewChild(IonContent) content: IonContent;
  messages: AngularFireList<Message>;
  viewMessages: Observable<Message[]>;
  pageTitle: string;
  sender: User;
  recipient: User;
  private chat1: AngularFireObject<Chat>;
  private chat2: AngularFireObject<Chat>;

  constructor(
    public authService: AuthService,
    public chatService: ChatService,
    public messageService: MessageService,
    public navCtrl: NavController,
    private route: ActivatedRoute,
    public userService: UserService
  ) {
    this.recipient = {
      $key: this.route.snapshot.params['$key'],
      name: this.route.snapshot.params['name'],
      username: this.route.snapshot.params['username'],
      email: this.route.snapshot.params['email'],
      photo: this.route.snapshot.params['photo'],
      birthDate: this.route.snapshot.params['birthDate'],
      passwordDate: this.route.snapshot.params['passwordDate'],
      createDate: this.route.snapshot.params['createDate'],
      isPatient: this.route.snapshot.params['isPatient']
    };
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ngOnInit() {
    this.pageTitle = this.recipient.name;

    this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .subscribe((currentUser: User) => {
        this.sender = currentUser;

        this.chat1 = this.chatService.getDeepChat(this.sender.$key, this.recipient.$key);
        this.chat2 = this.chatService.getDeepChat(this.recipient.$key, this.sender.$key);

        if (this.recipient.photo) {
          this.chatService.mapObjectKey(this.chat1).subscribe((chat: Chat) => {
            this.chatService.updatePhoto(this.chat1, chat.photo, this.recipient.photo);
          });
        }

        let doSubscription = () => {
          this.viewMessages = this.messageService.mapListKeys<Message>(this.messages);
          this.viewMessages.subscribe((messages: Message[]) => {
            this.scrollToBottom();
          });
        };

        this.messages = this.messageService.getMessages(this.sender.$key, this.recipient.$key);

        this.messages.valueChanges().subscribe((messages: Message[]) => {
          if (messages.length === 0) {
            this.messages = this.messageService.getMessages(this.recipient.$key, this.sender.$key);
            console.log('messages');
            console.log(messages);
            doSubscription();
          } else {
            doSubscription();
          }
        });
      });
  }

  sendMessage(newMessage: string): void {
    if (newMessage) {
      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.messageService
        .create(new Message(this.sender.$key, newMessage, currentTimestamp), this.messages)
        .then(() => {
          this.chat1.update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          });

          this.chat2.update({
            lastMessage: newMessage,
            timestamp: currentTimestamp
          });
        });
    }
  }

  private scrollToBottom(duration?: number): void {
    setTimeout(() => {
      if (this.content.getScrollElement()) {
        this.content.scrollToBottom(duration || 300);
      }
    }, 50);
  }
}
