import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Card } from '../../models/card.model';
import { CardService } from '../../services/card.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-organize-cards',
  templateUrl: './organize-cards.page.html',
  styleUrls: ['./organize-cards.page.scss']
})
export class OrganizeCardsPage implements OnInit {
  public cards: Card[];

  constructor(private cardService: CardService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.cardService.getAll().subscribe(cards => {
      this.cards = cards;
    });
  }

  closeModal() {
    this.cards.forEach((card: Card) => {
      card.position = this.cards.indexOf(card);
      this.cardService.update(card);
    });

    this.modalCtrl.dismiss();
  }

  async reorder(event): Promise<void> {
    console.log(`Moving item from ${event.detail.from} to ${event.detail.to}`);

    const itemToMove = this.cards.splice(event.detail.from, 1)[0];
    this.cards.splice(event.detail.to, 0, itemToMove);
    event.detail.complete();
  }

  onUpdate(card: Card): void {
    card.important = !card.important;
  }
}
