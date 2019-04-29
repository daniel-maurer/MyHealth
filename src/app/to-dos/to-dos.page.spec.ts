import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDosPage } from './to-dos.page';

describe('ToDosPage', () => {
  let component: ToDosPage;
  let fixture: ComponentFixture<ToDosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
