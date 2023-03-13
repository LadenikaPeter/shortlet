import { TestBed } from '@angular/core/testing';

import { ShortletApiService } from './shortlet-api.service';

describe('ShortletApiService', () => {
  let service: ShortletApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShortletApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
