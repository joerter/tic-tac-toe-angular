import { TestBed } from '@angular/core/testing';

import { TieService } from './tie.service';

describe('TieService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TieService = TestBed.get(TieService);
    expect(service).toBeTruthy();
  });
});
