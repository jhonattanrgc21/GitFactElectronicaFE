import { TestBed } from '@angular/core/testing';

import { PublicServiceServiceService } from './public-service-service.service';

describe('PublicServiceServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PublicServiceServiceService = TestBed.get(PublicServiceServiceService);
    expect(service).toBeTruthy();
  });
});
