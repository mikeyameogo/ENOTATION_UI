import { TestBed } from '@angular/core/testing';

import { GenererCodeService } from './generer-code.service';

describe('GenererCodeService', () => {
  let service: GenererCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenererCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
