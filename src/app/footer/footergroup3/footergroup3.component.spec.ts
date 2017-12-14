import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Footergroup3Component } from './footergroup3.component';

describe('Footergroup3Component', () => {
  let component: Footergroup3Component;
  let fixture: ComponentFixture<Footergroup3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Footergroup3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Footergroup3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
