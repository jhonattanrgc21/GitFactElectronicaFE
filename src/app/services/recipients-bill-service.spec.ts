import { TestBed } from '@angular/core/testing';

import { RecipientsBillService } from './recipients-bill-service';

describe('RecipientsBillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecipientsBillService = TestBed.get(RecipientsBillService);
    expect(service).toBeTruthy();
  });
});