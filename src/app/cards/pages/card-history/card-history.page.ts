import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddRecordService } from '../../services/add-record.service';
import { Observable } from 'rxjs';
import { Record } from '../../models/record.model';
import { HistoryCard } from '../../models/history-card.model';
import { RecordInfo } from '../../models/record-info.model';
import { Task } from '../../../task/models/task.model';
import { TaskService } from 'src/app/task/services/task.service';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-card-history',
  templateUrl: './card-history.page.html',
  styleUrls: ['./card-history.page.scss']
})
export class CardHistoryPage implements OnInit {
  private cardId: string;
  title: string = 'Histórico';

  public cards: HistoryCard[] = [];
  records$: Observable<Record[]>;
  tasks$: Observable<Task[]>;

  constructor(
    private route: ActivatedRoute,
    private addRecordService: AddRecordService,
    public recordService: RecordService,
    public tasksService: TaskService
  ) {
    this.cardId = this.route.snapshot.params.cardId;
  }

  ngOnInit() {
    this.records$ = this.addRecordService.getAll();
    this.tasks$ = this.tasksService.getAll();

    if (this.cardId) {
      this.recordService.getAll().subscribe(record => {
        this.title = record.filter(record2 => record2.id === this.cardId)[0].title;
      });
    }

    this.populateCardHistory();
  }

  populateCardHistory() {
    this.records$.subscribe((record: Record[]) => {
      let cards2: HistoryCard[] = [];

      if (this.cardId) {
        record = record.filter(r => r.type == this.cardId);
      }

      record.forEach((record: Record) => {
        const info1: RecordInfo = record.infos.filter(r => r.position == 1)[0];
        const info2: RecordInfo = record.infos.filter(r => r.position == 2)[0];

        const historyCard: HistoryCard = {
          title: record.title,
          isTask: false,
          taskDone: false,
          date: record.date,
          infoTitle1: info1.title + ':',
          infoValue1: info1.value,
          infoTitle2: info2 ? info2.title + ':' : '',
          infoValue2: info2 ? info2.value : '',
          source: record.source,
          icon: 'heart-empty'
        };

        cards2.push(historyCard);
      });

      this.cards = this.cards.filter(c => c.isTask);
      this.cards = this.cards.concat(cards2);
      this.cards = this.cards.sort((n1, n2) => this.compareStringTimestamp(n1.date, n2.date));
    });

    if (!this.cardId) {
      this.tasks$.subscribe((tasks: Task[]) => {
        const cards2: HistoryCard[] = [];

        tasks.forEach((task: Task) => {
          const historyCard: HistoryCard = {
            title: task.title,
            isTask: true,
            taskDone: false,
            date: task.completedDate,
            infoTitle1: task.done ? 'Concluído' : 'Não Concluído',
            infoValue1: '',
            infoTitle2: '',
            infoValue2: '',
            source: task.source,
            icon: 'checkmark-circle-outline'
          };

          if (task.completedDate) {
            cards2.push(historyCard);
          }
        });

        this.cards = this.cards.filter(c => !c.isTask);
        this.cards = this.cards.concat(cards2);
        this.cards = this.cards.sort((n1, n2) => this.compareStringTimestamp(n1.date, n2.date));
      });
    }
  }

  compareStringTimestamp(t1: string, t2: string): number {
    const l1 = new Date(t1).getTime();
    const l2 = new Date(t2).getTime();
    if (l2 > l1) {
      return 1;
    } else if (l1 > l2) {
      return -1;
    } else {
      return 0;
    }
  }
}
