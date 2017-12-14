import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Footergroup1Component } from './footergroup1.component';

describe('Footergroup1Component', () => {
  let component: Footergroup1Component;
  let fixture: ComponentFixture<Footergroup1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Footergroup1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Footergroup1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
