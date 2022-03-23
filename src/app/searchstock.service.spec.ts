import {TestBed} from '@angular/core/testing';

import {SearchstockService} from './searchstock.service';

describe('SearchstockService', () => {
  let service: SearchstockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchstockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
