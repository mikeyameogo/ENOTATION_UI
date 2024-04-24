import { TestBed } from '@angular/core/testing';

import { MinistereInstitutionService } from './ministere-institution.service';

describe('MinistereInstitutionService', () => {
  let service: MinistereInstitutionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MinistereInstitutionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
