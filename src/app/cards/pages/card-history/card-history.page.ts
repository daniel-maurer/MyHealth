import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AddRecordService } from '../../services/add-record.service';
import { Observable } from 'rxjs';
import { Record } from '../../models/record.model';
import { HistoryCard } from '../../models/history-card.model';

@Component({
  selector: 'app-card-history',
  templateUrl: './card-history.page.html',
  styleUrls: ['./card-history.page.scss']
})
export class CardHistoryPage implements OnInit {
  private cardId: string;

  public cards: HistoryCard[] = [
    {
      title: 'Medicação',
      isTask: false,
      taskDone: false,
      date: '2019-05-20T20:11:37.556-03:00',
      infoTitle1: 'Nome:',
      infoValue1: 'Paracetamol',
      infoTitle2: 'Dosagem:',
      infoValue2: '750 MG',
      source: 'Médico',
      icon: 'heart-empty'
    },
    {
      title: 'Consulta',
      isTask: true,
      taskDone: false,
      date: '2019-05-17T20:11:37.556-03:00',
      infoTitle1: 'Não concluído',
      infoValue1: '',
      infoTitle2: '',
      infoValue2: '',
      source: 'Médico 1',
      icon: 'checkmark-circle-outline'
    },
    {
      title: 'Apontamento',
      isTask: false,
      taskDone: false,
      date: '2019-05-16T20:11:37.556-03:00',
      infoTitle1: 'Apontamento de:',
      infoValue1: 'Médico',
      infoTitle2: 'Notas:',
      infoValue2: 'Febre leve sem sintomas de gripe.',
      source: 'Hospital 1',
      icon: 'heart-empty'
    },
    {
      title: 'Condição',
      isTask: false,
      taskDone: false,
      date: '2019-05-15T20:11:37.556-03:00',
      infoTitle1: 'Condição:',
      infoValue1: 'Febre leve.',
      infoTitle2: '',
      infoValue2: '',
      source: 'Daniel Maurer',
      icon: 'heart-empty'
    },
    {
      title: 'Procedimento',
      isTask: false,
      taskDone: false,
      date: '2019-05-11T20:11:37.556-03:00',
      infoTitle1: 'Executado por:',
      infoValue1: 'Médico 2',
      infoTitle2: 'Nome do procedimento:',
      infoValue2: 'Cirurgia Desvio de Septo',
      source: 'Hospital 2',
      icon: 'heart-empty'
    },
    {
      title: 'Marcar cirurgia',
      isTask: true,
      taskDone: true,
      date: '2019-05-05T20:11:37.556-03:00',
      infoTitle1: 'Concluído',
      infoValue1: '',
      infoTitle2: '',
      infoValue2: '',
      source: 'Daniel Maurer',
      icon: 'checkmark-circle-outline'
    }
  ];

  records$: Observable<Record[]>;

  constructor(private route: ActivatedRoute, private addRecordService: AddRecordService) {
    this.cardId = this.route.snapshot.params.cardId;
  }

  ngOnInit() {
    this.records$ = this.addRecordService.getAll();
    this.records$.subscribe(record => console.log(record));
  }
}
