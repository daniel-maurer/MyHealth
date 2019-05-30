import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardOptionsPage } from './card-options.page';

describe('CardOptionsPage', () => {
  let component: CardOptionsPage;
  let fixture: ComponentFixture<CardOptionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardOptionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOptionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
