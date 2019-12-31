import { TestBed } from '@angular/core/testing';

import { VerticalWinService } from './vertical-win.service';

describe('VerticalWinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VerticalWinService = TestBed.get(VerticalWinService);
    expect(service).toBeTruthy();
  });
});
