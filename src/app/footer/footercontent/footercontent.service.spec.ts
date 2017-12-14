import { TestBed, inject } from '@angular/core/testing';

import { FootercontentService } from './footercontent.service';

describe('FootercontentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FootercontentService]
    });
  });

  it('should be created', inject([FootercontentService], (service: FootercontentService) => {
    expect(service).toBeTruthy();
  }));
});
