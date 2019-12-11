import { TestBed } from '@angular/core/testing';

import { DiretorService } from './diretor.service';

describe('DiretorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiretorService = TestBed.get(DiretorService);
    expect(service).toBeTruthy();
  });
});
