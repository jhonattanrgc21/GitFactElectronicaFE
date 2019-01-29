import { TestBed } from '@angular/core/testing';

import { InsertBillService } from './insert-bill-service';

describe('PublicServiceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsertBillService = TestBed.get(InsertBillService);
    expect(service).toBeTruthy();
  });
});
