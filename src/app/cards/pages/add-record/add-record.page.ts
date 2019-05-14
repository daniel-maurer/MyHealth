import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from '../../models/record.model';
import { RecordService } from '../../services/record.service';
import { RecordInfo } from '../../models/record-info.model';
import { RecordInfoService } from '../../services/record-info.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.page.html',
  styleUrls: ['./add-record.page.scss']
})
export class AddRecordPage implements OnInit {
  title: string;
  infos: RecordInfo[];
  cardId: string;

  constructor(public tasksService: RecordService, public recordInfoService: RecordInfoService, private route: ActivatedRoute) {
    this.cardId = this.route.snapshot.params['cardId'];
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
}
