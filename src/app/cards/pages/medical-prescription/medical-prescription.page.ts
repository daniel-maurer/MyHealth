import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Card } from '../../models/card.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-medical-prescription',
  templateUrl: './medical-prescription.page.html',
  styleUrls: ['./medical-prescription.page.scss'],
})
export class MedicalPrescriptionPage implements OnInit {
  private cardId: string;
  private title: string;
  showMenuItem: boolean = false;

  cards$: Observable<Card[]>;

  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    public navCtrl: NavController,
  ) {
    this.cardId = this.route.snapshot.params.cardId;
  }

  ngOnInit() {
    this.cardService.getAll().subscribe(card => {
      this.title = card.filter(card2 => card2.id === this.cardId)[0].title;
    });

    this.cards$ = this.cardService.getAll().map(cards => {
      return cards.filter(card => card.canAssociatedTask);
    });
  }

  someFunction(item: Card) {
    let taskParameters = {
      cardId: this.cardId,
      taskInfo: item.id
    };

    this.navCtrl.navigateForward(['/tasks/create', taskParameters]);
    console.log(item.title);
  }

  onAddTask() {
    this.navCtrl.navigateForward(['/tasks/create', this.cardId]);
  }
}
