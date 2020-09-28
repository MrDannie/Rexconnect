import { TestBed } from '@angular/core/testing';

import { UserLayoutService } from './user-layout.service';

describe('UserLayoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserLayoutService = TestBed.get(UserLayoutService);
    expect(service).toBeTruthy();
  });
});
