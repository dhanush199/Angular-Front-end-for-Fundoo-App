import { TestBed } from '@angular/core/testing';

import { PipeService } from './pipe.service';

describe('PipeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PipeService = TestBed.get(PipeService);
    expect(service).toBeTruthy();
  });
});
