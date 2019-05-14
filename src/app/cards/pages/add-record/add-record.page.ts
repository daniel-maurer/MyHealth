import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Record } from '../../models/record.model';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.page.html',
  styleUrls: ['./add-record.page.scss'],
})
export class AddRecordPage implements OnInit {
  records$: Observable<Record[]>;

  constructor(
    public tasksService: RecordService,
  ) { }

  ngOnInit() {
    this.records$ = this.tasksService.getAll();
    console.log('records');
    console.log(this.records$);
  }

}
