import { TestBed } from '@angular/core/testing';

import { CustomerReviewService } from './customer-review.service';

describe('CustomerReviewService', () => {
  let service: CustomerReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
