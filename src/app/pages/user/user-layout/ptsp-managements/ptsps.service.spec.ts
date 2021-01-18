import { TestBed } from '@angular/core/testing';

import { PtspsService } from './ptsps.service';

describe('PtspsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PtspsService = TestBed.get(PtspsService);
    expect(service).toBeTruthy();
  });
});
