import { TestBed } from '@angular/core/testing';

import { BestSellerService } from './best-seller.service';

describe('BestSellerService', () => {
  let service: BestSellerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BestSellerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
