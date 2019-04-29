import { Component, OnInit, Input } from '@angular/core';
import { User } from './../user.model';

@Component({
  selector: 'user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent{

  @Input() user: User;
  @Input() isMenu: boolean = false;

  constructor() { }
}
