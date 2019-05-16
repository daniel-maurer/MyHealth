import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddRecordService } from '../../services/add-record.service';
import { Observable } from 'rxjs';
import { Record } from '../../models/record.model';

@Component({
  selector: 'app-card-history',
  templateUrl: './card-history.page.html',
  styleUrls: ['./card-history.page.scss'],
})
export class CardHistoryPage implements OnInit {
  private cardId: string;

  records$: Observable<Record[]>;

  constructor(private route: ActivatedRoute, private addRecordService: AddRecordService) {
    this.cardId = this.route.snapshot.params.cardId;
  }

  ngOnInit() {
    this.records$ = this.addRecordService.getAll();
    this.records$.subscribe(record => console.log(record));
  }

}
