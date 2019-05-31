import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { Card } from '../../models/card.model';

@Component({
  selector: 'app-card-options',
  templateUrl: './card-options.page.html',
  styleUrls: ['./card-options.page.scss'],
})
export class CardOptionsPage implements OnInit {
  @Input("cardId") cardId: string;

  public card: Card;

  constructor(
    private cardService: CardService
  ) { }

  ngOnInit() {
    if (this.cardId) {
      this.cardService.getAll().subscribe(card => {
        this.card = card.filter(card2 => card2.id === this.cardId)[0];
      });
    }
  }

  onImportant(card: Card): void {
    card.important = !card.important;
    this.cardService.update(card);
  }

  onVisible(card: Card): void {
    card.visible = !card.visible;
    this.cardService.update(card);
  }

}
