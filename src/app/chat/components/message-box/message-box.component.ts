import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-message-box',
  templateUrl: './message-box.component.html',
  styleUrls: ['./message-box.component.scss'],
// tslint:disable-next-line: use-host-property-decorator
  host: {
    '[style.justify-content]': '((!isFromSender) ? "flex-start" : "flex-end")',
    '[style.text-align]': '((!isFromSender) ? "left" : "right")'
  }
})
export class MessageBoxComponent {

  @Input() message: Message;
  @Input() isFromSender: boolean;
}
