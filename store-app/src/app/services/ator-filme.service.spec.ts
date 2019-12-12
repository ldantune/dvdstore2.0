import { TestBed } from '@angular/core/testing';

import { AtorFilmeService } from './ator-filme.service';

describe('AtorFilmeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtorFilmeService = TestBed.get(AtorFilmeService);
    expect(service).toBeTruthy();
  });
});
