import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from '../../models/record.model';
import { RecordService } from '../../services/record.service';
import { RecordInfo } from '../../models/record-info.model';
import { RecordInfoService } from '../../services/record-info.service';
import { ActivatedRoute } from '@angular/router';
import { AddRecordService } from '../../services/add-record.service';
import { RecordValue } from '../../models/record-value.model';
import { RecordComboValue } from '../../models/record-combo-value.model';
import { UserService } from 'src/app/auth/services/user.service';
import { User } from 'src/app/auth/models/user.model';
import { NavController } from '@ionic/angular';
import { OverlayService } from 'src/app/core/services/overlay.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.page.html',
  styleUrls: ['./add-record.page.scss']
})
export class AddRecordPage implements OnInit {
  title: string;
  date: any;
  notes: string = '';
  infos: RecordInfo[] = [];
  values: RecordValue[] = [];
  comboValues: RecordComboValue[] = [];
  cardId: string;

  currentUser: User;

  constructor(
    public recordService: RecordService,
    public recordInfoService: RecordInfoService,
    private route: ActivatedRoute,
    private addRecordService: AddRecordService,
    private navCtrl: NavController,
    private overlayService: OverlayService,
    private userService: UserService
  ) {
    this.cardId = this.route.snapshot.params.cardId;
    this.recordInfoService.init(this.cardId);
  }

  ngOnInit() {
    this.userService.mapObjectKey<User>(this.userService.currentUser).subscribe((user: User) => {
      console.log(user);
      this.currentUser = user;
    });

    this.recordService.getAll().subscribe(record => {
      this.title = record.filter(record2 => record2.id === this.cardId)[0].title;
    });

    this.recordInfoService.getAll().subscribe(inf => {
      this.infos = inf;
    });
  }

  onAdd() {
    if (this.verifyRequiredInfos()) {
      let record: Record = {
        title: this.title,
        infos: this.infos,
        date: this.date,
        note: this.notes,
        type: this.cardId,
        values: this.values,
        comboValues: this.comboValues,

        id: null,
        source: this.currentUser.name
      };

      this.addRecordService.create(record);
      this.navCtrl.navigateBack(`/card-history/${this.cardId}`);
    }
  }

  verifyRequiredInfos(): boolean {
    let requiredTitles: string = '';

    this.infos.forEach((record: RecordInfo) => {
      if (record.required && !record.value) {
        requiredTitles = `${requiredTitles}${record.title}, `;
      }
    });

    if (requiredTitles.length > 0) {
      requiredTitles = requiredTitles.substr(0, requiredTitles.length - 2);

      if (requiredTitles.indexOf(',') !== -1) {
        this.overlayService.toast({
          message: `Ei! Você se esqueceu dessas informações: ${requiredTitles}`
        });
      } else {
        this.overlayService.toast({
          message: `Ei! Você se esqueceu dessa informação: ${requiredTitles}`
        });
      }

      return false;
    }

    return true;
  }
}
