import { TestBed } from '@angular/core/testing';

import { ProfilAgentService } from './profil-agent.service';

describe('ProfilAgentService', () => {
  let service: ProfilAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfilAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
