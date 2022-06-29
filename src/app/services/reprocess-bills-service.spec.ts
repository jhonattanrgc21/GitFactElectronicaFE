import { TestBed } from '@angular/core/testing';

import { ReprocessBillSService } from './reprocess-bills-service';

describe('PublicServiceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReprocessBillSService = TestBed.get(ReprocessBillSService);
    expect(service).toBeTruthy();
  });
});