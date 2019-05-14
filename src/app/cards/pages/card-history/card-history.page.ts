import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-history',
  templateUrl: './card-history.page.html',
  styleUrls: ['./card-history.page.scss'],
})
export class CardHistoryPage implements OnInit {
  private cardId: string;

  constructor(private route: ActivatedRoute) {
    this.cardId = this.route.snapshot.params.cardId;
  }

  ngOnInit() {
  }

}
