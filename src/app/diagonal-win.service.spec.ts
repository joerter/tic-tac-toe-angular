import { TestBed } from '@angular/core/testing';

import { DiagonalWinService } from './diagonal-win.service';

describe('DiagonalWinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiagonalWinService = TestBed.get(DiagonalWinService);
    expect(service).toBeTruthy();
  });
});
