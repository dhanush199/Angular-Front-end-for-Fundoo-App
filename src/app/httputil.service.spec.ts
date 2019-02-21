import { TestBed } from '@angular/core/testing';

import { HttputilService } from './httputil.service';

describe('HttputilService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttputilService = TestBed.get(HttputilService);
    expect(service).toBeTruthy();
  });
});
