import { TestBed } from '@angular/core/testing';

import { AtorService } from './ator.service';

describe('AtorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtorService = TestBed.get(AtorService);
    expect(service).toBeTruthy();
  });
});
