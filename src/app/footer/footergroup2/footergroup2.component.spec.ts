import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Footergroup2Component } from './footergroup2.component';

describe('Footergroup2Component', () => {
  let component: Footergroup2Component;
  let fixture: ComponentFixture<Footergroup2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Footergroup2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Footergroup2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
