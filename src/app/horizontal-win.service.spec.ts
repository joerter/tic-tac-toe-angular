import { TestBed } from '@angular/core/testing';

import { HorizontalWinService } from './horizontal-win.service';

describe('HorizontalWinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HorizontalWinService = TestBed.get(HorizontalWinService);
    expect(service).toBeTruthy();
  });
});
