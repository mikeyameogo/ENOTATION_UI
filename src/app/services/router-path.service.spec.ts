import { TestBed } from '@angular/core/testing';

import { RouterPathService } from './router-path.service';

describe('RouterPathService', () => {
  let service: RouterPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouterPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
