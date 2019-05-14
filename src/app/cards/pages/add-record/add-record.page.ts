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

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.page.html',
  styleUrls: ['./add-record.page.scss']
})
export class AddRecordPage implements OnInit {
  title: string;
  date: any;
  notes: string;
  infos: RecordInfo[];
  values: RecordValue[];
  comboValues: RecordComboValue[];
  cardId: string;

  constructor(
    public tasksService: RecordService,
    public recordInfoService: RecordInfoService,
    private route: ActivatedRoute,
    private addRecordService: AddRecordService
  ) {
    this.cardId = this.route.snapshot.params.cardId;
    this.recordInfoService.init(this.cardId);
  }

  ngOnInit() {
    this.tasksService.getAll().subscribe(record => {
      this.title = record.filter(record2 => record2.id === this.cardId)[0].title;
    });

    this.recordInfoService.getAll().subscribe(inf => {
      this.infos = inf;
    });
  }

  onAdd() {
    let record: Record = {
      title: this.title,
      infos: this.infos,
      date: this.date,
      note: this.notes,
      type: this.cardId,
      values: this.values,
      comboValues: this.comboValues,

      id: null,
      source: null
    };

    console.log(record);
  }
}
