import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalPrescriptionPage } from './medical-prescription.page';

describe('MedicalPrescriptionPage', () => {
  let component: MedicalPrescriptionPage;
  let fixture: ComponentFixture<MedicalPrescriptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalPrescriptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalPrescriptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
