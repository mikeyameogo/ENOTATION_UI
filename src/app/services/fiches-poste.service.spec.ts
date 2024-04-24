import { TestBed } from '@angular/core/testing';

import { FichesPosteService } from './fiches-poste.service';

describe('FichesPosteService', () => {
  let service: FichesPosteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichesPosteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
