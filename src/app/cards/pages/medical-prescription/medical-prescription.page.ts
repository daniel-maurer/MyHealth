import { Component, OnInit } from '@angular/core';
import { CardService } from '../../services/card.service';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-medical-prescription',
  templateUrl: './medical-prescription.page.html',
  styleUrls: ['./medical-prescription.page.scss'],
})
export class MedicalPrescriptionPage implements OnInit {
  private cardId: string;
  private title: string;

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
  }

  onAddTask() {
    this.navCtrl.navigateForward(['/tasks/create', this.cardId]);
  }

}
