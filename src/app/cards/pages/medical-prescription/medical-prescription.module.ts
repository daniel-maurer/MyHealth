import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MedicalPrescriptionPage } from './medical-prescription.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalPrescriptionPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MedicalPrescriptionPage]
})
export class MedicalPrescriptionPageModule {}
