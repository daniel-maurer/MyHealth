import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';

import { AuthService } from '../../../core/services/auth.service';
import { Chat } from '../../models/chat.model';
import { ChatService } from '../../services/chat.service';
import { User } from '../../../auth/models/user.model';
import { UserService } from '../../../auth/services/user.service';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss']
})
export class MessagesPage implements OnInit {
  chats: Observable<Chat[]>;
  users: Observable<User[]>;
  view: string = 'chats';
  currentUser: User;

  constructor(
    public authService: AuthService,
    public chatService: ChatService,
    public menuCtrl: MenuController,
    public navCtrl: NavController,
    public userService: UserService
  ) {
    this.userService
    .mapObjectKey<User>(this.userService.currentUser)
    .subscribe((user: User) => {
              this.currentUser = user;
    });
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  ngOnInit() {
    this.chats = this.chatService.mapListKeys<Chat>(this.chatService.chats)
    .pipe(
      map((chats: Chat[]) => chats.reverse())
    );

    this.users = this.userService.users;
    this.menuCtrl.enable(true, 'user-menu');
  }

  filterItems(event: any): void {
    let searchTerm: string = event.target.value;

    this.chats = this.chatService.mapListKeys<Chat>(this.chatService.chats)
    .pipe(
      map((chats: Chat[]) => chats.reverse())
    );
    this.users = this.userService.users;

    if (searchTerm) {
      switch(this.view) {
        case 'chats':
          this.chats = this.chats
            .pipe(
              map((chats: Chat[]) => chats.filter((chat: Chat) => (chat.title && chat.title.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) > -1)))
            );
          break;

        case 'users':
          this.users = this.users
            .pipe(
              map((users: User[]) => users.filter((user: User) => (user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)))
            );
          break;
      }
    }
  }

  onChatCreate(recipientUser: User): void {
    this.userService
      .mapObjectKey<User>(this.userService.currentUser)
      .subscribe((currentUser: User) => {

        this.chatService
          .mapObjectKey<Chat>(this.chatService.getDeepChat(currentUser.$key, recipientUser.$key))
          .subscribe((chat: Chat) => {

            if (!chat.title) {

              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timestamp, recipientUser.name, recipientUser.headline, (recipientUser.photo || ''));
              this.chatService.create(chat1, currentUser.$key, recipientUser.$key);

              let chat2 = new Chat('', timestamp, currentUser.name, currentUser.headline, (currentUser.photo || ''));
              this.chatService.create(chat2, recipientUser.$key, currentUser.$key);

            }

          });

      });

    this.navCtrl.navigateForward(['chat', 'edit', recipientUser]);
  }

  onChatOpen(chat: Chat): void {
    let recipientUserId: string = chat.$key;

    this.userService.mapObjectKey<User>(
      this.userService.get(recipientUserId)
    )
      .subscribe((user: User) => {
        this.navCtrl.navigateForward(['chat', 'edit', user]);
      });

  }

  onSignup(): void {
    this.navCtrl.navigateForward('signup');
  }
}
